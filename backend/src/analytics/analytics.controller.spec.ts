import {
  CanActivate,
  ForbiddenException,
  INestApplication,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import {
  THROTTLER_LIMIT,
  THROTTLER_TTL,
} from '@nestjs/throttler/dist/throttler.constants';
import type { NestExpressApplication } from '@nestjs/platform-express';
import request from 'supertest';
import type { App } from 'supertest/types';
import { configureApp } from '../app-setup';
import { THROTTLE_WINDOW_MS } from '../common/throttle';
import { AdminGuard, AuthGuard } from '../auth/auth.guard';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService, AnalyticsOverview } from './analytics.service';

const emptyOverview: AnalyticsOverview = {
  totals: {
    today: { views: 0, visitors: 0 },
    last7: { views: 0, visitors: 0 },
    last30: { views: 0, visitors: 0 },
    allTime: { views: 0, visitors: 0 },
  },
  series: [],
  topPages: [],
  localeSplit: { en: 0, ms: 0 },
  deviceSplit: { mobile: 0, tablet: 0, desktop: 0 },
  rangeDays: 30,
  generatedAt: '2026-10-06T10:00:00.000Z',
};

const allow: CanActivate = { canActivate: () => true };
const denyUnauthorized: CanActivate = {
  canActivate: () => {
    throw new UnauthorizedException('Missing or invalid authorization header');
  },
};
const denyForbidden: CanActivate = {
  canActivate: () => {
    throw new ForbiddenException('Admin access required');
  },
};

interface ServiceMock {
  track: jest.Mock;
  getOverview: jest.Mock;
}

const compileModule = (
  authGuard: CanActivate,
  adminGuard: CanActivate,
  serviceMock: ServiceMock,
): Promise<TestingModule> =>
  Test.createTestingModule({
    controllers: [AnalyticsController],
    providers: [{ provide: AnalyticsService, useValue: serviceMock }],
  })
    .overrideGuard(AuthGuard)
    .useValue(authGuard)
    .overrideGuard(AdminGuard)
    .useValue(adminGuard)
    .compile();

const newServiceMock = (): ServiceMock => ({
  track: jest.fn().mockResolvedValue(undefined),
  getOverview: jest.fn().mockResolvedValue(emptyOverview),
});

const buildApp = async (
  authGuard: CanActivate,
  adminGuard: CanActivate,
): Promise<{
  app: INestApplication<App>;
  moduleRef: TestingModule;
  serviceMock: ServiceMock;
}> => {
  const serviceMock = newServiceMock();
  const moduleRef = await compileModule(authGuard, adminGuard, serviceMock);

  const app = moduleRef.createNestApplication<INestApplication<App>>();
  app.setGlobalPrefix('api');
  await app.init();
  return { app, moduleRef, serviceMock };
};

/**
 * Same controller, but wired through `configureApp` — the exact function
 * `main.ts` calls. The middleware stack (scoped 4kb parser, its 204 error
 * handler, the global ValidationPipe, the `api` prefix, then Nest's own
 * global body parser) is therefore the production one. A bare
 * `createNestApplication()` would skip all of it, which is precisely how an
 * oversized body reaching Express's default 413 page went unnoticed.
 */
const buildBootstrappedApp = async (): Promise<{
  app: NestExpressApplication;
  serviceMock: ServiceMock;
}> => {
  const serviceMock = newServiceMock();
  const moduleRef = await compileModule(allow, allow, serviceMock);

  const app = moduleRef.createNestApplication<NestExpressApplication>();
  configureApp(app);
  await app.init();
  return { app, serviceMock };
};

describe('AnalyticsController', () => {
  describe('POST /api/analytics/track', () => {
    let app: INestApplication<App>;
    let serviceMock: ServiceMock;

    beforeEach(async () => {
      ({ app, serviceMock } = await buildApp(denyUnauthorized, denyForbidden));
    });

    afterEach(async () => {
      await app.close();
    });

    it('answers 204 with no auth header at all', async () => {
      await request(app.getHttpServer())
        .post('/api/analytics/track')
        .send({
          path: '/ms/faq',
          locale: 'ms',
          visitorId: 'a'.repeat(32),
        })
        .expect(204);

      expect(serviceMock.track).toHaveBeenCalledTimes(1);
    });

    it('answers 204 for an invalid body instead of 400', async () => {
      await request(app.getHttpServer())
        .post('/api/analytics/track')
        .send({ path: 123, locale: 'zh', visitorId: 'nope' })
        .expect(204);
    });

    it('answers 204 for an empty body', async () => {
      await request(app.getHttpServer())
        .post('/api/analytics/track')
        .expect(204);
    });

    it('answers 204 even when the service rejects', async () => {
      serviceMock.track.mockRejectedValue(new Error('mongo down'));

      await request(app.getHttpServer())
        .post('/api/analytics/track')
        .send({ path: '/', locale: 'en', visitorId: 'a'.repeat(32) })
        .expect(204);
    });

    it('hands the user agent to the service but never echoes it back', async () => {
      const userAgent =
        'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)';

      const response = await request(app.getHttpServer())
        .post('/api/analytics/track')
        .set('User-Agent', userAgent)
        .send({ path: '/', locale: 'en', visitorId: 'a'.repeat(32) })
        .expect(204);

      expect(serviceMock.track).toHaveBeenCalledWith(
        expect.objectContaining({ path: '/' }),
        userAgent,
      );
      expect(response.text).toBe('');
    });

    it('carries its own 240-per-minute throttle bucket', () => {
      const reflector = new Reflector();
      const handler = Object.getOwnPropertyDescriptor(
        AnalyticsController.prototype,
        'track',
      )?.value as (...args: unknown[]) => unknown;

      expect(reflector.get<number>(`${THROTTLER_LIMIT}default`, handler)).toBe(
        240,
      );
      // Milliseconds, not seconds — see src/common/throttle.ts. The previous
      // assertion of `60` was literally true of the code and false of the
      // behaviour, which is what hid a 60 ms rate-limit window.
      expect(reflector.get<number>(`${THROTTLER_TTL}default`, handler)).toBe(
        THROTTLE_WINDOW_MS,
      );
      expect(THROTTLE_WINDOW_MS).toBe(60_000);
    });
  });

  describe('POST /api/analytics/track through the real main.ts wiring', () => {
    let app: NestExpressApplication;
    let serviceMock: ServiceMock;

    beforeEach(async () => {
      ({ app, serviceMock } = await buildBootstrappedApp());
    });

    afterEach(async () => {
      await app.close();
    });

    it('still answers 204 for a normal beacon', async () => {
      await request(app.getHttpServer())
        .post('/api/analytics/track')
        .send({ path: '/', locale: 'en', visitorId: 'a'.repeat(32) })
        .expect(204);

      expect(serviceMock.track).toHaveBeenCalledTimes(1);
    });

    it('answers 204 — not 413 — for a 200KB body', async () => {
      const oversized = {
        path: '/',
        locale: 'en',
        visitorId: 'a'.repeat(32),
        referrerHost: 'x'.repeat(200 * 1024),
      };
      const payload = JSON.stringify(oversized);
      expect(payload.length).toBeGreaterThan(200 * 1024);

      const response = await request(app.getHttpServer())
        .post('/api/analytics/track')
        .set('Content-Type', 'application/json')
        .send(payload)
        .expect(204);

      expect(response.text).toBe('');
      // Rejected by the parser, so the controller never ran.
      expect(serviceMock.track).not.toHaveBeenCalled();
    });

    it('answers 204 for a body just over the 4kb limit', async () => {
      await request(app.getHttpServer())
        .post('/api/analytics/track')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify({ path: '/', pad: 'x'.repeat(5 * 1024) }))
        .expect(204);

      expect(serviceMock.track).not.toHaveBeenCalled();
    });

    it('answers 204 for malformed JSON', async () => {
      await request(app.getHttpServer())
        .post('/api/analytics/track')
        .set('Content-Type', 'application/json')
        .send('{"path": "/", ')
        .expect(204);

      expect(serviceMock.track).not.toHaveBeenCalled();
    });

    it('answers 204 for Content-Type: text/plain', async () => {
      await request(app.getHttpServer())
        .post('/api/analytics/track')
        .set('Content-Type', 'text/plain')
        .send('path=/&locale=en')
        .expect(204);

      // No parser claims the body, so the service gets nothing and drops it.
      expect(serviceMock.track).toHaveBeenCalledTimes(1);
    });

    it('leaves the global 100kb parser alone for other routes', async () => {
      // The scoped parser is mounted on the track path only; a large body to
      // any other route must still hit Express's default 413, not a 204.
      await request(app.getHttpServer())
        .post('/api/analytics/overview')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify({ pad: 'x'.repeat(200 * 1024) }))
        .expect(413);
    });
  });

  describe('GET /api/analytics/overview', () => {
    it('returns the overview payload for an admin', async () => {
      const { app, serviceMock } = await buildApp(allow, allow);

      const response = await request(app.getHttpServer())
        .get('/api/analytics/overview?days=7')
        .expect(200);

      expect(serviceMock.getOverview).toHaveBeenCalledWith('7');
      expect(response.body).toEqual(emptyOverview);
      await app.close();
    });

    it('answers 401 without a JWT', async () => {
      const { app } = await buildApp(denyUnauthorized, denyForbidden);

      await request(app.getHttpServer())
        .get('/api/analytics/overview')
        .expect(401);

      await app.close();
    });

    it('answers 403 for a signed-in non-admin', async () => {
      const { app } = await buildApp(allow, denyForbidden);

      await request(app.getHttpServer())
        .get('/api/analytics/overview')
        .expect(403);

      await app.close();
    });
  });
});
