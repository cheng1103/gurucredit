import { Logger } from '@nestjs/common';
import {
  AnalyticsService,
  OTHER_PATH_BUCKET,
  PAGE_VIEW_RETENTION_DAYS,
  PAGE_VIEW_TTL_INDEX_NAME,
  bucketPath,
  dayKeyInKualaLumpur,
  deviceClassFromUserAgent,
  isBotUserAgent,
  isValidVisitorId,
  normalizePath,
  resolveRangeDays,
  retentionExpiryForDayKey,
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

/**
 * A `$runCommandRaw` stand-in that behaves like a real MongoDB cursor: it
 * hands back at most `batchSize` documents per round trip and only reports
 * the cursor exhausted (`id: 0`) once everything has been drained with
 * `getMore`. The cursor id is returned in extended-JSON `{ $numberLong }`
 * form, which is how Prisma surfaces an int64.
 *
 * MongoDB's real default first batch is 101 documents — the service used to
 * read only that first batch, so anything larger was silently truncated.
 */
const createCursorServer = (rows: Doc[], batchSize: number): jest.Mock => {
  const open = new Map<string, Doc[]>();
  let nextCursorId = 1;

  const page = (
    id: string,
    pending: Doc[],
    field: 'firstBatch' | 'nextBatch',
  ) => {
    const batch = pending.slice(0, batchSize);
    const rest = pending.slice(batchSize);
    if (rest.length === 0) {
      open.delete(id);
      return { cursor: { id: 0, ns: 'test.PageView', [field]: batch }, ok: 1 };
    }
    open.set(id, rest);
    return {
      cursor: {
        id: { $numberLong: id },
        ns: 'test.PageView',
        [field]: batch,
      },
      ok: 1,
    };
  };

  return jest.fn((command: unknown) => {
    const cmd = command as Record<string, unknown>;

    if ('aggregate' in cmd) {
      if (cmd.aggregate !== 'PageView') {
        throw new Error(`unexpected collection: ${String(cmd.aggregate)}`);
      }
      const id = String(nextCursorId);
      nextCursorId += 1;
      const results = runPipeline(rows, cmd.pipeline as Doc[]);
      return Promise.resolve(page(id, results, 'firstBatch'));
    }

    if ('getMore' in cmd) {
      const raw = cmd.getMore as { $numberLong?: string } | number | string;
      const id =
        typeof raw === 'object' ? String(raw.$numberLong) : String(raw);
      const pending = open.get(id);
      if (!pending) throw new Error(`getMore on an unknown cursor: ${id}`);
      if (cmd.collection !== 'PageView') {
        throw new Error('getMore must name the collection');
      }
      return Promise.resolve(page(id, pending, 'nextBatch'));
    }

    throw new Error(`unsupported command: ${Object.keys(cmd).join(',')}`);
  });
};

/** `days` days of rows ending on `lastDayKey`, one view each. */
const seedDays = (lastDayKey: string, days: number): Doc[] => {
  const start = Date.parse(`${lastDayKey}T00:00:00Z`);
  return Array.from({ length: days }, (_, index) => ({
    dayKey: new Date(start - (days - 1 - index) * 86_400_000)
      .toISOString()
      .slice(0, 10),
    path: '/',
    locale: 'en',
    visitorId: VISITOR_A,
    device: 'desktop',
  }));
};

/** The private aggregation helper, for the cursor-draining tests. */
type Aggregate = (pipeline: Doc[]) => Promise<Doc[]>;
const aggregateOf = (service: AnalyticsService): Aggregate => {
  const internals = service as unknown as { aggregate: Aggregate };
  return (pipeline) => internals.aggregate(pipeline);
};

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

  describe('bucketPath', () => {
    it('keeps a static route the site serves', () => {
      expect(bucketPath('/')).toBe('/');
      expect(bucketPath('/faq')).toBe('/faq');
      expect(bucketPath('/tools/compare')).toBe('/tools/compare');
      expect(bucketPath('/loan-guides/ccris-ctos')).toBe(
        '/loan-guides/ccris-ctos',
      );
    });

    it('keeps the same routes under the /ms prefix, including the Malay home', () => {
      expect(bucketPath('/ms')).toBe('/ms');
      expect(bucketPath('/ms/faq')).toBe('/ms/faq');
      expect(bucketPath('/ms/tools/compare')).toBe('/ms/tools/compare');
    });

    it('keeps the four dynamic route shapes', () => {
      expect(
        bucketPath('/blog/personal-loan-malaysia-complete-guide-2026'),
      ).toBe('/blog/personal-loan-malaysia-complete-guide-2026');
      expect(
        bucketPath('/ms/blog/sabah-sarawak-borrower-guide-loan-malaysia'),
      ).toBe('/ms/blog/sabah-sarawak-borrower-guide-loan-malaysia');
      expect(bucketPath('/loan-guides/topics/bad-credit-loan-options')).toBe(
        '/loan-guides/topics/bad-credit-loan-options',
      );
      expect(bucketPath('/loans/my/negeri-sembilan')).toBe(
        '/loans/my/negeri-sembilan',
      );
      expect(bucketPath('/services/1/apply')).toBe('/services/1/apply');
    });

    it('buckets a 404 that is not a route the site serves', () => {
      expect(bucketPath('/this-page-does-not-exist')).toBe(OTHER_PATH_BUCKET);
      expect(bucketPath('/ms/nope')).toBe(OTHER_PATH_BUCKET);
      expect(bucketPath('/blog/a/b')).toBe(OTHER_PATH_BUCKET);
      expect(bucketPath('/services/1')).toBe(OTHER_PATH_BUCKET);
    });

    it('buckets a mangled link carrying a third party email address', () => {
      // A real failure mode: an email client turning a link into a path.
      expect(bucketPath('/blog/x (baabaa311@gmail.com)')).toBe(
        OTHER_PATH_BUCKET,
      );
      expect(bucketPath('/blog/ali.bin.abu@gmail.com')).toBe(OTHER_PATH_BUCKET);
    });

    it('buckets anything IC-, phone- or reference-number shaped', () => {
      expect(bucketPath('/blog/880101105432')).toBe(OTHER_PATH_BUCKET);
      expect(bucketPath('/services/0123456789/apply')).toBe(OTHER_PATH_BUCKET);
    });

    it('buckets an attacker-chosen string instead of storing it', () => {
      expect(bucketPath('/Buy-Cheap-Pills-Now')).toBe(OTHER_PATH_BUCKET);
      expect(bucketPath(`/${'a'.repeat(300)}`)).toBe(OTHER_PATH_BUCKET);
    });
  });

  describe('retentionExpiryForDayKey', () => {
    it('expires at the start of the next Kuala Lumpur day plus 180 days', () => {
      // 2026-10-08 00:00 in Kuala Lumpur is 2026-10-07T16:00:00Z.
      expect(retentionExpiryForDayKey('2026-10-07')).toEqual(
        new Date('2027-04-05T16:00:00.000Z'),
      );
    });

    it('gives every view on one day the identical expiry', () => {
      // This is the privacy property: `expiresAt` must not reveal when within
      // the day a visitor browsed, or it can be joined to an Application.
      expect(retentionExpiryForDayKey('2026-10-07')).toEqual(
        retentionExpiryForDayKey('2026-10-07'),
      );
      expect(retentionExpiryForDayKey('2026-10-08')).not.toEqual(
        retentionExpiryForDayKey('2026-10-07'),
      );
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

  it('writes one normalised row with a Kuala Lumpur day key and a day-granular expiry', async () => {
    await service.track(validBody(), CHROME);

    expect(prismaMock.pageView.create).toHaveBeenCalledTimes(1);
    const arg = createdCall(prismaMock.pageView.create);
    // An exhaustive match, so a re-added `createdAt` — or any other new
    // column — fails here rather than shipping silently.
    expect(arg.data).toEqual({
      path: '/ms/faq',
      locale: 'ms',
      visitorId: VISITOR_A,
      referrerHost: 'www.google.com',
      device: 'desktop',
      dayKey: '2026-10-07',
      expiresAt: new Date(
        Date.parse('2026-10-08T00:00:00+08:00') +
          PAGE_VIEW_RETENTION_DAYS * 86_400_000,
      ),
    });
  });

  it('stores no per-row timestamp', async () => {
    await service.track(validBody(), CHROME);

    expect(createdCall(prismaMock.pageView.create).data).not.toHaveProperty(
      'createdAt',
    );
  });

  it('gives two views hours apart on the same day one identical expiry', async () => {
    await service.track(validBody(), CHROME);
    jest.setSystemTime(new Date('2026-10-07T09:15:00Z')); // same KL day
    await service.track(validBody(), CHROME);

    const calls = prismaMock.pageView.create.mock.calls as unknown as Array<
      [{ data: Record<string, unknown> }]
    >;
    expect(calls).toHaveLength(2);
    expect(calls[0][0].data.dayKey).toBe('2026-10-07');
    expect(calls[1][0].data.dayKey).toBe('2026-10-07');
    expect(calls[1][0].data.expiresAt).toEqual(calls[0][0].data.expiresAt);
  });

  it('stores a path the site does not serve as the /_other bucket', async () => {
    // A 404 from a mangled link — the view still counts, but the third
    // party's address must not reach the database or the admin UI.
    await service.track(
      { ...validBody(), path: '/blog/ali.bin.abu@gmail.com' },
      CHROME,
    );

    expect(prismaMock.pageView.create).toHaveBeenCalledTimes(1);
    const serialised = JSON.stringify(createdCall(prismaMock.pageView.create));
    expect(createdCall(prismaMock.pageView.create).data.path).toBe(
      OTHER_PATH_BUCKET,
    );
    expect(serialised).not.toContain('ali.bin.abu');
  });

  it('drops rather than buckets a path that is structurally unusable', async () => {
    // A space (or any control character) means the input was never a path.
    await service.track(
      { ...validBody(), path: '/blog/x (ali.bin.abu@gmail.com)' },
      CHROME,
    );

    expect(prismaMock.pageView.create).not.toHaveBeenCalled();
  });

  it('stores a known route verbatim', async () => {
    await service.track({ ...validBody(), path: '/ms/loans/my/sabah' }, CHROME);

    expect(createdCall(prismaMock.pageView.create).data.path).toBe(
      '/ms/loans/my/sabah',
    );
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

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('creates the TTL index on expiresAt idempotently', async () => {
    await service.onModuleInit();

    expect(prismaMock.$runCommandRaw).toHaveBeenCalledTimes(1);
    expect(prismaMock.$runCommandRaw).toHaveBeenCalledWith({
      createIndexes: 'PageView',
      indexes: [
        {
          key: { expiresAt: 1 },
          name: PAGE_VIEW_TTL_INDEX_NAME,
          expireAfterSeconds: 0,
        },
      ],
    });
    expect(service.isRetentionIndexReady).toBe(true);
  });

  it('does not stop boot when the database rejects the index creation', async () => {
    prismaMock.$runCommandRaw.mockRejectedValue(new Error('read-only replica'));
    jest.spyOn(Logger.prototype, 'error').mockImplementation(() => undefined);

    await expect(service.onModuleInit()).resolves.toBeUndefined();
    expect(service.isRetentionIndexReady).toBe(false);
  });

  it('logs the failure at error naming the index, not at debug', async () => {
    // This index is the only thing that deletes PageView rows, so a silent
    // failure makes the 180-day retention promise quietly false.
    prismaMock.$runCommandRaw.mockRejectedValue(
      new Error('not authorized on guru to execute command createIndexes'),
    );
    const error = jest
      .spyOn(Logger.prototype, 'error')
      .mockImplementation(() => undefined);
    const debug = jest
      .spyOn(Logger.prototype, 'debug')
      .mockImplementation(() => undefined);

    await service.onModuleInit();

    expect(debug).not.toHaveBeenCalled();
    expect(error).toHaveBeenCalled();
    const messages = error.mock.calls.map(([message]) => String(message));
    expect(messages.join('\n')).toContain(PAGE_VIEW_TTL_INDEX_NAME);
    expect(messages.join('\n')).toContain('not authorized');
    expect(messages.join('\n')).toMatch(/will NOT expire/i);
  });

  it('retries the index creation once before giving up', async () => {
    prismaMock.$runCommandRaw.mockRejectedValue(new Error('not primary'));
    jest.spyOn(Logger.prototype, 'error').mockImplementation(() => undefined);

    await service.onModuleInit();

    expect(prismaMock.$runCommandRaw).toHaveBeenCalledTimes(2);
  });

  it('stops retrying as soon as the index is created', async () => {
    prismaMock.$runCommandRaw
      .mockRejectedValueOnce(new Error('not primary'))
      .mockResolvedValueOnce({ ok: 1 });
    jest.spyOn(Logger.prototype, 'error').mockImplementation(() => undefined);
    jest.spyOn(Logger.prototype, 'log').mockImplementation(() => undefined);

    await service.onModuleInit();

    expect(prismaMock.$runCommandRaw).toHaveBeenCalledTimes(2);
    expect(service.isRetentionIndexReady).toBe(true);
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
    // 101 is MongoDB's real default first-batch size.
    prismaMock.$runCommandRaw.mockImplementation(createCursorServer(rows, 101));
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
    prismaMock.$runCommandRaw.mockImplementation(createCursorServer([], 101));

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

/**
 * `aggregate` used to read only `cursor.firstBatch`, so any result set past
 * MongoDB's 101-document first batch was silently truncated — the 90-day
 * series fit by eleven documents and nothing else was close. These tests seed
 * more than 101 days so the cursor genuinely has to be drained.
 */
describe('AnalyticsService aggregation cursors', () => {
  let prismaMock: PrismaAnalyticsMock;
  let service: AnalyticsService;

  const DAYS = 120;
  const rows = seedDays('2026-10-06', DAYS);

  const dailySeriesPipeline: Doc[] = [
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
  ];

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-10-06T10:00:00Z'));
    prismaMock = createPrismaMock();
    service = new AnalyticsService(prismaMock as unknown as PrismaService);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('returns all 120 day groups across MongoDB default 101-document batches', async () => {
    prismaMock.$runCommandRaw.mockImplementation(createCursorServer(rows, 101));

    const groups = await aggregateOf(service)(dailySeriesPipeline);

    expect(groups).toHaveLength(DAYS);
    expect(groups[0]._id).toBe('2026-06-09');
    expect(groups[DAYS - 1]._id).toBe('2026-10-06');
    // Exactly one aggregate plus one getMore for the 19-document remainder.
    expect(prismaMock.$runCommandRaw).toHaveBeenCalledTimes(2);
  });

  it('asks for a large batch so the common case is a single round trip', async () => {
    prismaMock.$runCommandRaw.mockImplementation(
      createCursorServer(rows, 1000),
    );

    const groups = await aggregateOf(service)(dailySeriesPipeline);

    expect(groups).toHaveLength(DAYS);
    expect(prismaMock.$runCommandRaw).toHaveBeenCalledTimes(1);
    expect(prismaMock.$runCommandRaw).toHaveBeenCalledWith(
      expect.objectContaining({ cursor: { batchSize: 1000 } }),
    );
  });

  it('drains however many batches the server chooses to use', async () => {
    prismaMock.$runCommandRaw.mockImplementation(createCursorServer(rows, 7));

    const groups = await aggregateOf(service)(dailySeriesPipeline);

    expect(groups).toHaveLength(DAYS);
    expect(prismaMock.$runCommandRaw.mock.calls.length).toBeGreaterThan(10);
  });

  it('returns the full 90-day series through getOverview when the server pages', async () => {
    prismaMock.$runCommandRaw.mockImplementation(createCursorServer(rows, 25));

    const overview = await service.getOverview('90');

    expect(overview.series).toHaveLength(90);
    expect(overview.series[0].date).toBe('2026-07-09');
    expect(overview.series[89].date).toBe('2026-10-06');
    // Every seeded day must be present — a truncated cursor would zero-fill
    // the oldest days instead, with no error anywhere.
    expect(overview.series.every((point) => point.views === 1)).toBe(true);
    expect(overview.totals.allTime).toEqual({ views: DAYS, visitors: 1 });
  });

  it('fails loudly rather than spinning when a cursor stays open but yields nothing', async () => {
    prismaMock.$runCommandRaw.mockResolvedValue({
      cursor: {
        id: { $numberLong: '42' },
        ns: 'test.PageView',
        firstBatch: [],
        nextBatch: [],
      },
      ok: 1,
    });

    await expect(aggregateOf(service)(dailySeriesPipeline)).rejects.toThrow(
      /stalled/,
    );
  });

  it('treats an extended-JSON zero cursor id as exhausted', async () => {
    prismaMock.$runCommandRaw.mockResolvedValue({
      cursor: {
        id: { $numberLong: '0' },
        ns: 'test.PageView',
        firstBatch: [{ _id: '2026-10-06', views: 1, visitors: 1 }],
      },
      ok: 1,
    });

    await expect(aggregateOf(service)(dailySeriesPipeline)).resolves.toEqual([
      { _id: '2026-10-06', views: 1, visitors: 1 },
    ]);
    expect(prismaMock.$runCommandRaw).toHaveBeenCalledTimes(1);
  });
});
