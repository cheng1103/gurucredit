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
import request from 'supertest';
import type { App } from 'supertest/types';
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

const buildApp = async (
  authGuard: CanActivate,
  adminGuard: CanActivate,
): Promise<{
  app: INestApplication<App>;
  moduleRef: TestingModule;
  serviceMock: ServiceMock;
}> => {
  const serviceMock: ServiceMock = {
    track: jest.fn().mockResolvedValue(undefined),
    getOverview: jest.fn().mockResolvedValue(emptyOverview),
  };

  const moduleRef = await Test.createTestingModule({
    controllers: [AnalyticsController],
    providers: [{ provide: AnalyticsService, useValue: serviceMock }],
  })
    .overrideGuard(AuthGuard)
    .useValue(authGuard)
    .overrideGuard(AdminGuard)
    .useValue(adminGuard)
    .compile();

  const app = moduleRef.createNestApplication<INestApplication<App>>();
  app.setGlobalPrefix('api');
  await app.init();
  return { app, moduleRef, serviceMock };
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

    it('carries its own 240/60s throttle bucket', () => {
      const reflector = new Reflector();
      const handler = Object.getOwnPropertyDescriptor(
        AnalyticsController.prototype,
        'track',
      )?.value as (...args: unknown[]) => unknown;

      expect(reflector.get<number>(`${THROTTLER_LIMIT}default`, handler)).toBe(
        240,
      );
      expect(reflector.get<number>(`${THROTTLER_TTL}default`, handler)).toBe(
        60,
      );
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
