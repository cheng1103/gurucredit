import {
  AnalyticsService,
  PAGE_VIEW_RETENTION_DAYS,
  dayKeyInKualaLumpur,
  deviceClassFromUserAgent,
  isBotUserAgent,
  isValidVisitorId,
  normalizePath,
  resolveRangeDays,
} from './analytics.service';
import type { PrismaService } from '../prisma/prisma.service';

type Doc = Record<string, unknown>;

type PrismaAnalyticsMock = {
  pageView: { create: jest.Mock };
  $runCommandRaw: jest.Mock;
};

const createPrismaMock = (): PrismaAnalyticsMock => ({
  pageView: { create: jest.fn().mockResolvedValue({ id: 'pv-1' }) },
  $runCommandRaw: jest.fn().mockResolvedValue({ ok: 1 }),
});

/* ------------------------------------------------------------------ *
 * A tiny in-memory stand-in for the MongoDB aggregation stages this
 * service actually uses ($match / $group / $sort / $limit), so the
 * overview tests exercise the real pipelines against seeded rows.
 * ------------------------------------------------------------------ */

const asFieldRef = (value: unknown): string =>
  typeof value === 'string' ? value : '';

const refValue = (doc: Doc, expression: string): unknown => {
  let current: unknown = doc;
  for (const key of expression.slice(1).split('.')) {
    if (current === null || typeof current !== 'object') return undefined;
    current = (current as Doc)[key];
  }
  return current;
};

const matchesFilter = (doc: Doc, filter: Doc): boolean =>
  Object.entries(filter).every(([field, condition]) => {
    const value = doc[field];
    if (
      condition !== null &&
      typeof condition === 'object' &&
      !Array.isArray(condition)
    ) {
      return Object.entries(condition as Doc).every(([operator, operand]) => {
        if (operator === '$gte') return String(value) >= String(operand);
        if (operator === '$lte') return String(value) <= String(operand);
        throw new Error(`unsupported match operator: ${operator}`);
      });
    }
    return value === condition;
  });

const groupIdOf = (doc: Doc, idSpec: unknown): unknown => {
  if (idSpec === null || idSpec === undefined) return null;
  if (typeof idSpec === 'string') return refValue(doc, idSpec);
  const composite: Doc = {};
  for (const [field, expression] of Object.entries(idSpec as Doc)) {
    composite[field] = refValue(doc, asFieldRef(expression));
  }
  return composite;
};

const runGroup = (docs: Doc[], stage: Doc): Doc[] => {
  const accumulators = Object.entries(stage).filter(([key]) => key !== '_id');
  const buckets = new Map<string, Doc>();
  for (const doc of docs) {
    const id = groupIdOf(doc, stage._id);
    const key = JSON.stringify(id ?? null);
    let bucket = buckets.get(key);
    if (!bucket) {
      bucket = { _id: id };
      for (const [field] of accumulators) bucket[field] = 0;
      buckets.set(key, bucket);
    }
    for (const [field, spec] of accumulators) {
      const sum = (spec as Doc).$sum;
      if (sum === undefined) throw new Error('only $sum is supported');
      const delta =
        typeof sum === 'number'
          ? sum
          : Number(refValue(doc, asFieldRef(sum)) ?? 0);
      bucket[field] = Number(bucket[field]) + delta;
    }
  }
  return [...buckets.values()];
};

const runSort = (docs: Doc[], stage: Doc): Doc[] =>
  [...docs].sort((a, b) => {
    for (const [field, direction] of Object.entries(stage)) {
      const dir = Number(direction);
      const left = a[field];
      const right = b[field];
      if (typeof left === 'number' && typeof right === 'number') {
        if (left !== right) return (left - right) * dir;
        continue;
      }
      const leftText = String(left);
      const rightText = String(right);
      if (leftText !== rightText) return (leftText < rightText ? -1 : 1) * dir;
    }
    return 0;
  });

const runPipeline = (docs: Doc[], pipeline: Doc[]): Doc[] =>
  pipeline.reduce<Doc[]>((acc, stage) => {
    if ('$match' in stage)
      return acc.filter((doc) => matchesFilter(doc, stage.$match as Doc));
    if ('$group' in stage) return runGroup(acc, stage.$group as Doc);
    if ('$sort' in stage) return runSort(acc, stage.$sort as Doc);
    if ('$limit' in stage) return acc.slice(0, Number(stage.$limit));
    throw new Error(`unsupported stage: ${Object.keys(stage).join(',')}`);
  }, docs);

/** The single `pageView.create({ data })` argument, typed for assertions. */
const createdCall = (create: jest.Mock): { data: Record<string, unknown> } => {
  const calls = create.mock.calls as unknown as Array<
    [{ data: Record<string, unknown> }]
  >;
  return calls[0][0];
};

const VISITOR_A = 'a'.repeat(32);
const VISITOR_B = 'b'.repeat(32);

describe('analytics helpers', () => {
  describe('normalizePath', () => {
    it('keeps a Malay-prefixed path as-is', () => {
      expect(normalizePath('/ms/faq')).toBe('/ms/faq');
    });

    it('keeps the site root', () => {
      expect(normalizePath('/')).toBe('/');
    });

    it('strips a query string', () => {
      expect(normalizePath('/blog?utm=x')).toBe('/blog');
    });

    it('strips a hash fragment', () => {
      expect(normalizePath('/blog#frag')).toBe('/blog');
    });

    it('strips both a query string and a hash fragment', () => {
      expect(normalizePath('/ms/faq?utm=x#frag')).toBe('/ms/faq');
    });

    it('drops a trailing slash so /faq and /faq/ are one page', () => {
      expect(normalizePath('/faq/')).toBe('/faq');
    });

    it('rejects an absolute URL with a scheme', () => {
      expect(normalizePath('http://evil')).toBeNull();
    });

    it('rejects a protocol-relative URL', () => {
      expect(normalizePath('//evil.com/path')).toBeNull();
    });

    it('rejects path traversal', () => {
      expect(normalizePath('/blog/../../etc/passwd')).toBeNull();
    });

    it('rejects a path longer than 512 characters', () => {
      expect(normalizePath(`/${'a'.repeat(512)}`)).toBeNull();
    });

    it('rejects a path that does not start with a slash', () => {
      expect(normalizePath('blog')).toBeNull();
    });

    it('rejects non-string input', () => {
      expect(normalizePath(undefined)).toBeNull();
      expect(normalizePath(42)).toBeNull();
    });
  });

  describe('isValidVisitorId', () => {
    it('accepts exactly 32 lowercase hex characters', () => {
      expect(isValidVisitorId('0123456789abcdef0123456789abcdef')).toBe(true);
    });

    it('rejects the wrong length, uppercase hex, and anything personal', () => {
      expect(isValidVisitorId('0123456789abcdef')).toBe(false);
      expect(isValidVisitorId('0123456789ABCDEF0123456789ABCDEF')).toBe(false);
      expect(isValidVisitorId('user@example.com')).toBe(false);
      expect(isValidVisitorId(undefined)).toBe(false);
    });
  });

  describe('isBotUserAgent', () => {
    it('rejects Googlebot', () => {
      expect(
        isBotUserAgent(
          'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        ),
      ).toBe(true);
    });

    it('rejects other common crawlers and headless browsers', () => {
      expect(isBotUserAgent('Mozilla/5.0 (compatible; bingbot/2.0)')).toBe(
        true,
      );
      expect(isBotUserAgent('facebookexternalhit/1.1')).toBe(true);
      expect(isBotUserAgent('Mozilla/5.0 HeadlessChrome/120.0.0.0')).toBe(true);
    });

    it('does NOT treat a missing or empty user agent as a bot', () => {
      // An edge proxy that strips the header must not silently take all
      // traffic to zero; counting a few unlabelled scripts is the cheaper
      // mistake. See the comment on isBotUserAgent.
      expect(isBotUserAgent(undefined)).toBe(false);
      expect(isBotUserAgent(null)).toBe(false);
      expect(isBotUserAgent('')).toBe(false);
      expect(isBotUserAgent('   ')).toBe(false);
    });

    it('accepts a real browser', () => {
      expect(
        isBotUserAgent(
          'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
        ),
      ).toBe(false);
    });
  });

  describe('deviceClassFromUserAgent', () => {
    it('classifies an iPhone as mobile', () => {
      expect(
        deviceClassFromUserAgent(
          'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) Mobile/15E148 Safari/604.1',
        ),
      ).toBe('mobile');
    });

    it('classifies an iPad as tablet', () => {
      expect(
        deviceClassFromUserAgent(
          'Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Safari/604.1',
        ),
      ).toBe('tablet');
    });

    it('classifies an Android tablet as tablet', () => {
      expect(
        deviceClassFromUserAgent(
          'Mozilla/5.0 (Linux; Android 14; SM-X200) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
        ),
      ).toBe('tablet');
    });

    it('classifies an Android phone as mobile', () => {
      expect(
        deviceClassFromUserAgent(
          'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 Chrome/120.0.0.0 Mobile Safari/537.36',
        ),
      ).toBe('mobile');
    });

    it('falls back to desktop', () => {
      expect(
        deviceClassFromUserAgent(
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
        ),
      ).toBe('desktop');
      expect(deviceClassFromUserAgent(undefined)).toBe('desktop');
    });
  });

  describe('dayKeyInKualaLumpur', () => {
    it('buckets a late-evening UTC instant into the next Kuala Lumpur day', () => {
      expect(dayKeyInKualaLumpur(new Date('2026-10-06T17:30:00Z'))).toBe(
        '2026-10-07',
      );
    });

    it('buckets a morning UTC instant into the same Kuala Lumpur day', () => {
      expect(dayKeyInKualaLumpur(new Date('2026-10-06T01:30:00Z'))).toBe(
        '2026-10-06',
      );
    });

    it('buckets just before the Kuala Lumpur midnight boundary', () => {
      expect(dayKeyInKualaLumpur(new Date('2026-10-06T15:59:59Z'))).toBe(
        '2026-10-06',
      );
    });
  });

  describe('resolveRangeDays', () => {
    it('accepts 7, 30 and 90 as numbers or strings', () => {
      expect(resolveRangeDays(7)).toBe(7);
      expect(resolveRangeDays('30')).toBe(30);
      expect(resolveRangeDays('90')).toBe(90);
    });

    it('falls back to 30 for anything else', () => {
      expect(resolveRangeDays(undefined)).toBe(30);
      expect(resolveRangeDays('1')).toBe(30);
      expect(resolveRangeDays('365')).toBe(30);
      expect(resolveRangeDays('nonsense')).toBe(30);
    });
  });
});

describe('AnalyticsService.track', () => {
  let prismaMock: PrismaAnalyticsMock;
  let service: AnalyticsService;

  const CHROME =
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36';

  const validBody = () => ({
    path: '/ms/faq?utm=x#frag',
    locale: 'ms',
    visitorId: VISITOR_A,
    referrerHost: 'www.google.com',
  });

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-10-06T17:30:00Z'));
    prismaMock = createPrismaMock();
    service = new AnalyticsService(prismaMock as unknown as PrismaService);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('writes one normalised row with a Kuala Lumpur day key and a 180-day expiry', async () => {
    await service.track(validBody(), CHROME);

    expect(prismaMock.pageView.create).toHaveBeenCalledTimes(1);
    const arg = createdCall(prismaMock.pageView.create);
    expect(arg.data).toEqual({
      path: '/ms/faq',
      locale: 'ms',
      visitorId: VISITOR_A,
      referrerHost: 'www.google.com',
      device: 'desktop',
      dayKey: '2026-10-07',
      expiresAt: new Date(
        Date.parse('2026-10-06T17:30:00Z') +
          PAGE_VIEW_RETENTION_DAYS * 86_400_000,
      ),
    });
  });

  it('never stores the user agent, an IP, or a query string', async () => {
    await service.track(
      { ...validBody(), ip: '1.2.3.4', userAgent: CHROME },
      CHROME,
    );

    const serialised = JSON.stringify(createdCall(prismaMock.pageView.create));
    expect(serialised).not.toContain('1.2.3.4');
    expect(serialised).not.toContain('Chrome');
    expect(serialised).not.toContain('utm');
  });

  it('drops a Googlebot request without writing a row', async () => {
    await service.track(
      validBody(),
      'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
    );

    expect(prismaMock.pageView.create).not.toHaveBeenCalled();
  });

  it('counts a view with no user agent at all, classed as desktop', async () => {
    await service.track(validBody(), undefined);

    expect(prismaMock.pageView.create).toHaveBeenCalledTimes(1);
    expect(createdCall(prismaMock.pageView.create).data).toEqual(
      expect.objectContaining({ path: '/ms/faq', device: 'desktop' }),
    );
  });

  it('counts a view whose user agent header is blank', async () => {
    await service.track(validBody(), '   ');

    expect(prismaMock.pageView.create).toHaveBeenCalledTimes(1);
    expect(createdCall(prismaMock.pageView.create).data).toEqual(
      expect.objectContaining({ device: 'desktop' }),
    );
  });

  it('drops a request whose visitorId is not 32 hex characters', async () => {
    await service.track(
      { ...validBody(), visitorId: 'baabaa311@gmail.com' },
      CHROME,
    );

    expect(prismaMock.pageView.create).not.toHaveBeenCalled();
  });

  it('drops a request with an unsupported locale', async () => {
    await service.track({ ...validBody(), locale: 'zh' }, CHROME);

    expect(prismaMock.pageView.create).not.toHaveBeenCalled();
  });

  it('drops a request with an unusable path', async () => {
    await service.track({ ...validBody(), path: 'http://evil' }, CHROME);

    expect(prismaMock.pageView.create).not.toHaveBeenCalled();
  });

  it('nulls a referrer that is this site rather than dropping the view', async () => {
    await service.track(
      { ...validBody(), referrerHost: 'www.guru-credit.com' },
      CHROME,
    );

    const arg = createdCall(prismaMock.pageView.create);
    expect(arg.data.referrerHost).toBeNull();
  });

  it('nulls a referrer that is not a plain hostname', async () => {
    await service.track(
      { ...validBody(), referrerHost: 'https://news.example.com/article?id=1' },
      CHROME,
    );

    const arg = createdCall(prismaMock.pageView.create);
    expect(arg.data.referrerHost).toBeNull();
  });

  it('resolves rather than throwing when the write fails', async () => {
    prismaMock.pageView.create.mockRejectedValue(new Error('mongo down'));

    await expect(service.track(validBody(), CHROME)).resolves.toBeUndefined();
  });

  it('resolves rather than throwing when the body is not an object', async () => {
    await expect(service.track('nope', CHROME)).resolves.toBeUndefined();
    await expect(service.track(null, CHROME)).resolves.toBeUndefined();
    expect(prismaMock.pageView.create).not.toHaveBeenCalled();
  });
});

describe('AnalyticsService.onModuleInit', () => {
  let prismaMock: PrismaAnalyticsMock;
  let service: AnalyticsService;

  beforeEach(() => {
    prismaMock = createPrismaMock();
    service = new AnalyticsService(prismaMock as unknown as PrismaService);
  });

  it('creates the TTL index on expiresAt idempotently', async () => {
    await service.onModuleInit();

    expect(prismaMock.$runCommandRaw).toHaveBeenCalledWith({
      createIndexes: 'PageView',
      indexes: [
        {
          key: { expiresAt: 1 },
          name: 'PageView_expiresAt_ttl',
          expireAfterSeconds: 0,
        },
      ],
    });
  });

  it('does not stop boot when the database rejects the index creation', async () => {
    prismaMock.$runCommandRaw.mockRejectedValue(new Error('read-only replica'));

    await expect(service.onModuleInit()).resolves.toBeUndefined();
  });
});

describe('AnalyticsService.getOverview', () => {
  let prismaMock: PrismaAnalyticsMock;
  let service: AnalyticsService;

  // Seeded rows: two days, two visitors, one repeat view.
  const rows: Doc[] = [
    {
      dayKey: '2026-10-05',
      path: '/',
      locale: 'en',
      visitorId: VISITOR_A,
      device: 'desktop',
    },
    {
      dayKey: '2026-10-05',
      path: '/',
      locale: 'en',
      visitorId: VISITOR_A,
      device: 'desktop',
    },
    {
      dayKey: '2026-10-06',
      path: '/',
      locale: 'en',
      visitorId: VISITOR_A,
      device: 'desktop',
    },
    {
      dayKey: '2026-10-06',
      path: '/ms/faq',
      locale: 'ms',
      visitorId: VISITOR_B,
      device: 'mobile',
    },
  ];

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-10-06T10:00:00Z')); // 18:00 in KL
    prismaMock = createPrismaMock();
    prismaMock.$runCommandRaw.mockImplementation((command: unknown) => {
      const { aggregate, pipeline } = command as {
        aggregate: string;
        pipeline: Doc[];
      };
      if (aggregate !== 'PageView') {
        throw new Error(`unexpected collection: ${aggregate}`);
      }
      return Promise.resolve({
        cursor: {
          id: 0,
          ns: 'test.PageView',
          firstBatch: runPipeline(rows, pipeline),
        },
        ok: 1,
      });
    });
    service = new AnalyticsService(prismaMock as unknown as PrismaService);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('counts views and distinct visitors per range', async () => {
    const overview = await service.getOverview('7');

    expect(overview.totals).toEqual({
      today: { views: 2, visitors: 2 },
      last7: { views: 4, visitors: 2 },
      last30: { views: 4, visitors: 2 },
      allTime: { views: 4, visitors: 2 },
    });
  });

  it('zero-fills every day in the window and keeps them in order', async () => {
    const overview = await service.getOverview('7');

    expect(overview.rangeDays).toBe(7);
    expect(overview.series).toEqual([
      { date: '2026-09-30', views: 0, visitors: 0 },
      { date: '2026-10-01', views: 0, visitors: 0 },
      { date: '2026-10-02', views: 0, visitors: 0 },
      { date: '2026-10-03', views: 0, visitors: 0 },
      { date: '2026-10-04', views: 0, visitors: 0 },
      { date: '2026-10-05', views: 2, visitors: 1 },
      { date: '2026-10-06', views: 2, visitors: 2 },
    ]);
  });

  it('returns 30 zero-filled days by default', async () => {
    const overview = await service.getOverview(undefined);

    expect(overview.rangeDays).toBe(30);
    expect(overview.series).toHaveLength(30);
    expect(overview.series[0].date).toBe('2026-09-07');
    expect(overview.series[29]).toEqual({
      date: '2026-10-06',
      views: 2,
      visitors: 2,
    });
  });

  it('ranks top pages by views with distinct visitors per page', async () => {
    const overview = await service.getOverview('7');

    expect(overview.topPages).toEqual([
      { path: '/', views: 3, visitors: 1 },
      { path: '/ms/faq', views: 1, visitors: 1 },
    ]);
  });

  it('splits the window by locale and device', async () => {
    const overview = await service.getOverview('7');

    expect(overview.localeSplit).toEqual({ en: 3, ms: 1 });
    expect(overview.deviceSplit).toEqual({
      mobile: 1,
      tablet: 0,
      desktop: 3,
    });
  });

  it('stamps generatedAt as an ISO timestamp', async () => {
    const overview = await service.getOverview('7');

    expect(overview.generatedAt).toBe('2026-10-06T10:00:00.000Z');
  });

  it('returns an empty but well-formed payload when there is no traffic', async () => {
    prismaMock.$runCommandRaw.mockImplementation((command: unknown) => {
      const { pipeline } = command as { pipeline: Doc[] };
      return Promise.resolve({
        cursor: {
          id: 0,
          ns: 'test.PageView',
          firstBatch: runPipeline([], pipeline),
        },
        ok: 1,
      });
    });

    const overview = await service.getOverview('7');

    expect(overview.totals).toEqual({
      today: { views: 0, visitors: 0 },
      last7: { views: 0, visitors: 0 },
      last30: { views: 0, visitors: 0 },
      allTime: { views: 0, visitors: 0 },
    });
    expect(overview.topPages).toEqual([]);
    expect(overview.localeSplit).toEqual({ en: 0, ms: 0 });
    expect(overview.deviceSplit).toEqual({
      mobile: 0,
      tablet: 0,
      desktop: 0,
    });
    expect(overview.series).toHaveLength(7);
    expect(overview.series.every((point) => point.views === 0)).toBe(true);
  });
});
