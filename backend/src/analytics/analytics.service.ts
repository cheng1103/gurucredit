import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import {
  MAX_PATH_LENGTH,
  SUPPORTED_LOCALES,
  TrackPageViewDto,
  VISITOR_ID_PATTERN,
} from './dto/track-page-view.dto';

/** MongoDB collection backing the Prisma `PageView` model (no `@@map`). */
const PAGE_VIEW_COLLECTION = 'PageView';

/** Rows self-delete after this many days via the TTL index on `expiresAt`. */
export const PAGE_VIEW_RETENTION_DAYS = 180;

const MS_PER_DAY = 86_400_000;

/** All day bucketing — at ingestion and in the overview — uses this zone. */
export const ANALYTICS_TIME_ZONE = 'Asia/Kuala_Lumpur';

/** Windows the admin overview supports. */
export const ALLOWED_RANGE_DAYS = [7, 30, 90] as const;
export const DEFAULT_RANGE_DAYS = 30;

const TOP_PAGES_LIMIT = 10;

export type DeviceClass = 'mobile' | 'tablet' | 'desktop';

/**
 * Hosts that are this site. A referrer from one of these is internal
 * navigation, so the field is nulled rather than stored.
 */
const OWN_HOSTS = new Set([
  'guru-credit.com',
  'www.guru-credit.com',
  'localhost',
  '127.0.0.1',
]);

const BOT_PATTERN =
  /bot|crawl|spider|slurp|scrape|archive|monitor|preview|headless|lighthouse|pingdom|gtmetrix|semrush|ahrefs|mj12|dotbot|petalbot|yandex|baidu|duckduck|applebot|facebookexternalhit|embedly|whatsapp|telegram|discord|skypeuripreview|curl|wget|python-requests|axios|okhttp|java\/|go-http-client|postman|phantomjs|puppeteer|playwright/i;

const TABLET_PATTERN = /ipad|tablet|playbook|silk|kindle|android(?!.*mobi)/i;
const MOBILE_PATTERN =
  /mobi|iphone|ipod|android|blackberry|bb10|iemobile|opera mini|windows phone/i;

const HOSTNAME_PATTERN =
  /^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

const dayKeyFormatter = new Intl.DateTimeFormat('en-CA', {
  timeZone: ANALYTICS_TIME_ZONE,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

/** `YYYY-MM-DD` for the given instant in Asia/Kuala_Lumpur. */
export const dayKeyInKualaLumpur = (date: Date): string =>
  dayKeyFormatter.format(date);

/** Shifts a `YYYY-MM-DD` key by whole days. Kuala Lumpur has no DST, so
 *  plain UTC arithmetic on the key is exact. */
export const shiftDayKey = (dayKey: string, deltaDays: number): string => {
  const shifted =
    new Date(`${dayKey}T00:00:00Z`).getTime() + deltaDays * MS_PER_DAY;
  return new Date(shifted).toISOString().slice(0, 10);
};

/**
 * Normalises a submitted path to what we are willing to store: a site-relative
 * path with the query string and hash removed. Returns `null` when the input
 * cannot be trusted, in which case the view is simply not counted.
 */
export const normalizePath = (input: unknown): string | null => {
  if (typeof input !== 'string') return null;
  if (input.length > MAX_PATH_LENGTH) return null;

  const withoutFragment = input.split('#')[0];
  const path = withoutFragment.split('?')[0].trim();

  if (!path.startsWith('/')) return null;
  if (path.startsWith('//')) return null; // protocol-relative URL
  if (path.includes('..')) return null; // traversal
  if (path.includes('://') || path.includes('\\')) return null;
  // Whitespace and control characters never appear in a real site path.
  for (let index = 0; index < path.length; index += 1) {
    const code = path.charCodeAt(index);
    if (code <= 0x20 || code === 0x7f) return null;
  }
  if (path.length > MAX_PATH_LENGTH) return null;

  // Collapse the trailing slash so /faq and /faq/ are one page, keeping root.
  const trimmed = path.length > 1 ? path.replace(/\/+$/, '') : path;
  return trimmed.length === 0 ? '/' : trimmed;
};

export const isValidVisitorId = (value: unknown): boolean =>
  typeof value === 'string' && VISITOR_ID_PATTERN.test(value);

/**
 * Bot-ness is derived in-request and the user agent is then discarded.
 *
 * A missing or empty user agent is treated as a normal view, not a bot. Every
 * real browser does send one, so an absent header usually is a script — but
 * the failure modes are wildly asymmetric: counting a few unlabelled scripts
 * costs almost nothing, while an edge proxy that strips the header would drop
 * *all* traffic to zero silently. Genuine bot user agents are still rejected
 * by the pattern below.
 */
export const isBotUserAgent = (
  userAgent: string | undefined | null,
): boolean => {
  if (typeof userAgent !== 'string' || userAgent.trim().length === 0)
    return false;
  return BOT_PATTERN.test(userAgent);
};

/** Device class derived in-request; the user agent itself is never stored. */
export const deviceClassFromUserAgent = (
  userAgent: string | undefined | null,
): DeviceClass => {
  if (typeof userAgent !== 'string' || userAgent.length === 0) return 'desktop';
  if (TABLET_PATTERN.test(userAgent)) return 'tablet';
  if (MOBILE_PATTERN.test(userAgent)) return 'mobile';
  return 'desktop';
};

/** Keeps a referring host only when it is a bare, external hostname. */
export const normalizeReferrerHost = (input: unknown): string | null => {
  if (typeof input !== 'string') return null;
  const host = input.trim().toLowerCase();
  if (host.length === 0 || host.length > 255) return null;
  if (!HOSTNAME_PATTERN.test(host)) return null;
  if (OWN_HOSTS.has(host)) return null;
  return host;
};

export const resolveRangeDays = (raw: unknown): number => {
  const value = typeof raw === 'string' ? Number(raw) : raw;
  if (typeof value !== 'number' || !Number.isInteger(value)) {
    return DEFAULT_RANGE_DAYS;
  }
  return (ALLOWED_RANGE_DAYS as readonly number[]).includes(value)
    ? value
    : DEFAULT_RANGE_DAYS;
};

export interface AnalyticsRangeTotals {
  views: number;
  visitors: number;
}

export interface AnalyticsSeriesPoint {
  date: string;
  views: number;
  visitors: number;
}

export interface AnalyticsTopPage {
  path: string;
  views: number;
  visitors: number;
}

export interface AnalyticsOverview {
  totals: {
    today: AnalyticsRangeTotals;
    last7: AnalyticsRangeTotals;
    last30: AnalyticsRangeTotals;
    allTime: AnalyticsRangeTotals;
  };
  series: AnalyticsSeriesPoint[];
  topPages: AnalyticsTopPage[];
  localeSplit: { en: number; ms: number };
  deviceSplit: { mobile: number; tablet: number; desktop: number };
  rangeDays: number;
  generatedAt: string;
}

type MongoFilter = Record<string, unknown>;
type MongoStage = Record<string, unknown>;

interface CountedGroup {
  _id: unknown;
  views?: unknown;
  visitors?: unknown;
}

const toCount = (value: unknown): number =>
  typeof value === 'number' && Number.isFinite(value) ? value : 0;

@Injectable()
export class AnalyticsService implements OnModuleInit {
  private readonly logger = new Logger(AnalyticsService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Prisma cannot declare TTL indexes, so the 180-day expiry index is created
   * here. `createIndexes` is idempotent for an identical definition. Any
   * failure (read-only replica, unreachable database) is logged at debug and
   * swallowed so it can never stop the app from booting.
   */
  async onModuleInit(): Promise<void> {
    try {
      await this.prisma.$runCommandRaw({
        createIndexes: PAGE_VIEW_COLLECTION,
        indexes: [
          {
            key: { expiresAt: 1 },
            name: 'PageView_expiresAt_ttl',
            expireAfterSeconds: 0,
          },
        ],
      });
    } catch (error) {
      this.logger.debug(
        `PageView TTL index not created: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }
  }

  /**
   * Records one page view. Never throws and never logs the caller's IP or
   * user agent: the user agent is read only to derive bot-ness and a device
   * class, then discarded. Invalid input is dropped silently — the controller
   * answers 204 either way, so a bad beacon can never break a page.
   */
  async track(body: unknown, userAgent?: string): Promise<void> {
    try {
      if (isBotUserAgent(userAgent)) return;
      if (body === null || typeof body !== 'object' || Array.isArray(body)) {
        return;
      }

      const dto = plainToInstance(TrackPageViewDto, body, {
        excludeExtraneousValues: false,
      });
      const errors = validateSync(dto, {
        whitelist: true,
        forbidUnknownValues: false,
      });
      if (errors.length > 0) return;

      const path = normalizePath(dto.path);
      if (path === null) return;
      if (!isValidVisitorId(dto.visitorId)) return;
      if (!(SUPPORTED_LOCALES as readonly string[]).includes(dto.locale)) {
        return;
      }

      const now = new Date();
      await this.prisma.pageView.create({
        data: {
          path,
          locale: dto.locale,
          visitorId: dto.visitorId,
          referrerHost: normalizeReferrerHost(dto.referrerHost),
          device: deviceClassFromUserAgent(userAgent),
          dayKey: dayKeyInKualaLumpur(now),
          expiresAt: new Date(
            now.getTime() + PAGE_VIEW_RETENTION_DAYS * MS_PER_DAY,
          ),
        },
      });
    } catch (error) {
      // Deliberately coarse: ingestion must never surface an error to the
      // browser, and nothing request-identifying may be logged.
      this.logger.debug(
        `Page view dropped: ${
          error instanceof Error ? error.message : 'unknown error'
        }`,
      );
    }
  }

  async getOverview(rawDays?: unknown): Promise<AnalyticsOverview> {
    const rangeDays = resolveRangeDays(rawDays);
    const now = new Date();
    const todayKey = dayKeyInKualaLumpur(now);
    const windowKeys = Array.from({ length: rangeDays }, (_, index) =>
      shiftDayKey(todayKey, index - (rangeDays - 1)),
    );
    const windowFilter: MongoFilter = {
      dayKey: { $gte: windowKeys[0], $lte: todayKey },
    };

    const [
      today,
      last7,
      last30,
      allTime,
      dailyGroups,
      pageGroups,
      localeGroups,
      deviceGroups,
    ] = await Promise.all([
      this.rangeTotals({ dayKey: todayKey }),
      this.rangeTotals({
        dayKey: { $gte: shiftDayKey(todayKey, -6), $lte: todayKey },
      }),
      this.rangeTotals({
        dayKey: { $gte: shiftDayKey(todayKey, -29), $lte: todayKey },
      }),
      // `allTime` has no `$match`, so it is a full collection scan — no index
      // can help an unfiltered count. Acceptable at this site's volume (a few
      // thousand rows, capped by the 180-day TTL). If `PageView` ever grows
      // past roughly a million rows, stop scanning it: maintain a rolled-up
      // daily totals collection (one row per `dayKey` with views and a
      // distinct-visitor count, written by a nightly job) and read `allTime`
      // from that instead. The other seven aggregations are `dayKey`-filtered
      // and stay index-backed.
      this.rangeTotals({}),
      // Distinct visitors need two $group stages: Prisma has no
      // distinct-count aggregate, so this runs as a raw aggregation.
      this.aggregate<CountedGroup>([
        { $match: windowFilter },
        {
          $group: {
            _id: { dayKey: '$dayKey', visitorId: '$visitorId' },
            views: { $sum: 1 },
          },
        },
        {
          $group: {
            _id: '$_id.dayKey',
            views: { $sum: '$views' },
            visitors: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]),
      this.aggregate<CountedGroup>([
        { $match: windowFilter },
        {
          $group: {
            _id: { path: '$path', visitorId: '$visitorId' },
            views: { $sum: 1 },
          },
        },
        {
          $group: {
            _id: '$_id.path',
            views: { $sum: '$views' },
            visitors: { $sum: 1 },
          },
        },
        { $sort: { views: -1, _id: 1 } },
        { $limit: TOP_PAGES_LIMIT },
      ]),
      this.aggregate<CountedGroup>([
        { $match: windowFilter },
        { $group: { _id: '$locale', views: { $sum: 1 } } },
      ]),
      this.aggregate<CountedGroup>([
        { $match: windowFilter },
        { $group: { _id: '$device', views: { $sum: 1 } } },
      ]),
    ]);

    const byDay = new Map<string, CountedGroup>(
      dailyGroups.map((group) => [String(group._id), group]),
    );
    const series: AnalyticsSeriesPoint[] = windowKeys.map((date) => {
      const group = byDay.get(date);
      return {
        date,
        views: toCount(group?.views),
        visitors: toCount(group?.visitors),
      };
    });

    const localeViews = new Map<string, number>(
      localeGroups.map((group) => [String(group._id), toCount(group.views)]),
    );
    const deviceViews = new Map<string, number>(
      deviceGroups.map((group) => [String(group._id), toCount(group.views)]),
    );

    return {
      totals: { today, last7, last30, allTime },
      series,
      topPages: pageGroups.map((group) => ({
        path: String(group._id),
        views: toCount(group.views),
        visitors: toCount(group.visitors),
      })),
      localeSplit: {
        en: localeViews.get('en') ?? 0,
        ms: localeViews.get('ms') ?? 0,
      },
      deviceSplit: {
        mobile: deviceViews.get('mobile') ?? 0,
        tablet: deviceViews.get('tablet') ?? 0,
        desktop: deviceViews.get('desktop') ?? 0,
      },
      rangeDays,
      generatedAt: now.toISOString(),
    };
  }

  /** Views plus distinct visitors for one day-key filter. */
  private async rangeTotals(
    filter: MongoFilter,
  ): Promise<AnalyticsRangeTotals> {
    const [result] = await this.aggregate<CountedGroup>([
      { $match: filter },
      { $group: { _id: '$visitorId', views: { $sum: 1 } } },
      {
        $group: {
          _id: null,
          views: { $sum: '$views' },
          visitors: { $sum: 1 },
        },
      },
    ]);
    return {
      views: toCount(result?.views),
      visitors: toCount(result?.visitors),
    };
  }

  private async aggregate<T>(pipeline: MongoStage[]): Promise<T[]> {
    const command = {
      aggregate: PAGE_VIEW_COLLECTION,
      pipeline,
      cursor: {},
    } as unknown as Prisma.InputJsonObject;
    const response = (await this.prisma.$runCommandRaw(command)) as unknown as {
      cursor?: { firstBatch?: T[] };
    };
    return response?.cursor?.firstBatch ?? [];
  }
}
