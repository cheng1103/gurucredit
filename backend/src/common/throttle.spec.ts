import { CanActivate, INestApplication } from '@nestjs/common';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import {
  THROTTLER_LIMIT,
  THROTTLER_TTL,
} from '@nestjs/throttler/dist/throttler.constants';
import request from 'supertest';
import type { App } from 'supertest/types';
import { GLOBAL_THROTTLE_LIMIT, THROTTLE_WINDOW_MS } from './throttle';
import { AnalyticsController } from '../analytics/analytics.controller';
import { AnalyticsService } from '../analytics/analytics.service';
import { ApplicationsController } from '../applications/applications.controller';
import { AuthController } from '../auth/auth.controller';
import { AdminGuard, AuthGuard } from '../auth/auth.guard';
import { ContactController } from '../contact/contact.controller';
import { LeadsController } from '../leads/leads.controller';
import { NewsletterController } from '../newsletter/newsletter.controller';

type Handler = (...args: unknown[]) => unknown;

const handlerOf = (prototype: object, method: string): Handler => {
  const descriptor = Object.getOwnPropertyDescriptor(prototype, method);
  if (!descriptor) throw new Error(`no handler ${method} on the prototype`);
  return descriptor.value as Handler;
};

/**
 * Every `@Throttle` in the app, with the per-minute limit it is meant to
 * enforce. A new throttled route should be added here; a route that drops out
 * of the list is a route that lost its bucket.
 */
const THROTTLED_ROUTES: Array<[string, object, string, number]> = [
  ['POST /auth/register', AuthController.prototype, 'register', 3],
  ['POST /auth/login', AuthController.prototype, 'login', 5],
  ['POST /auth/refresh', AuthController.prototype, 'refresh', 30],
  ['POST /contact', ContactController.prototype, 'create', 3],
  ['POST /leads', LeadsController.prototype, 'create', 8],
  [
    'POST /applications/public',
    ApplicationsController.prototype,
    'createPublic',
    5,
  ],
  [
    'POST /applications/reference/status',
    ApplicationsController.prototype,
    'lookupByReference',
    5,
  ],
  [
    'POST /newsletter/subscribe',
    NewsletterController.prototype,
    'subscribe',
    5,
  ],
  [
    'POST /newsletter/unsubscribe',
    NewsletterController.prototype,
    'unsubscribe',
    5,
  ],
  ['POST /analytics/track', AnalyticsController.prototype, 'track', 240],
];

describe('throttle windows', () => {
  const reflector = new Reflector();

  it('expresses the shared window in milliseconds, not seconds', () => {
    // `@nestjs/throttler` v6 takes `ttl` in milliseconds. A bare `60` here
    // would be a 60 ms window — i.e. no rate limiting at all.
    expect(THROTTLE_WINDOW_MS).toBe(60_000);
    expect(GLOBAL_THROTTLE_LIMIT).toBe(60);
  });

  it.each(THROTTLED_ROUTES)(
    '%s throttles %#',
    (_label, prototype, method, limit) => {
      const handler = handlerOf(prototype, method);

      expect(reflector.get<number>(`${THROTTLER_LIMIT}default`, handler)).toBe(
        limit,
      );
      expect(reflector.get<number>(`${THROTTLER_TTL}default`, handler)).toBe(
        THROTTLE_WINDOW_MS,
      );
    },
  );

  it('leaves no @Throttle decorator on a seconds-shaped window', () => {
    const windows = THROTTLED_ROUTES.map(([, prototype, method]) =>
      reflector.get<number>(
        `${THROTTLER_TTL}default`,
        handlerOf(prototype, method),
      ),
    );

    expect(windows).toHaveLength(10);
    expect(new Set(windows)).toEqual(new Set([60_000]));
  });
});

/**
 * Drives a real throttled route past its limit through the real
 * `ThrottlerGuard` and the real in-memory storage. With the window in
 * milliseconds this is deterministic; with the old `ttl: 60` the bucket
 * decayed faster than supertest could fill it, so no 429 ever arrived.
 *
 * `POST /analytics/track` is used because it is the one unauthenticated write
 * on the site, and its limit (240) is the highest in the app — if the window
 * is honoured here it is honoured everywhere.
 */
describe('ThrottlerGuard on POST /api/analytics/track', () => {
  let app: INestApplication<App>;

  const allow: CanActivate = { canActivate: () => true };
  const beacon = {
    path: '/',
    locale: 'en',
    visitorId: 'a'.repeat(32),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ThrottlerModule.forRoot([
          { ttl: THROTTLE_WINDOW_MS, limit: GLOBAL_THROTTLE_LIMIT },
        ]),
      ],
      controllers: [AnalyticsController],
      providers: [
        {
          provide: AnalyticsService,
          useValue: {
            track: jest.fn().mockResolvedValue(undefined),
            getOverview: jest.fn(),
          },
        },
        { provide: APP_GUARD, useClass: ThrottlerGuard },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(allow)
      .overrideGuard(AdminGuard)
      .useValue(allow)
      .compile();

    app = moduleRef.createNestApplication<INestApplication<App>>();
    app.setGlobalPrefix('api');
    await app.init();
  }, 60_000);

  afterAll(async () => {
    // Clears the storage service's pending expiry timers.
    await app.close();
  });

  it('answers 429 once the 240-per-minute bucket is exhausted', async () => {
    const server = app.getHttpServer();

    for (let sent = 0; sent < 240; sent += 1) {
      await request(server)
        .post('/api/analytics/track')
        .send(beacon)
        .expect(204);
    }

    const blocked = await request(server)
      .post('/api/analytics/track')
      .send(beacon)
      .expect(429);

    // The guard reports the remaining window; a 60 ms ttl would round to 0.
    expect(Number(blocked.headers['retry-after'])).toBeGreaterThan(1);
    expect(Number(blocked.headers['retry-after'])).toBeLessThanOrEqual(60);
  }, 60_000);
});
