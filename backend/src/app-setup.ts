import { ValidationPipe } from '@nestjs/common';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { registerAnalyticsBodyParser } from './analytics/analytics-body-parser';

/**
 * Environment-independent wiring shared by `bootstrap()` in `main.ts` and the
 * tests that need the real middleware stack. Everything here must run before
 * `app.init()`/`app.listen()`, and after `app.enableCors()` so a request
 * rejected by the analytics body parser still carries its CORS headers.
 *
 * It lives outside `main.ts` only because importing `main.ts` would execute
 * `bootstrap()` and bind a port; a test that built its own bare app instead
 * would silently skip this wiring, which is how the oversized-body gap got in.
 */
export const configureApp = (app: NestExpressApplication): void => {
  // Must come before the global parser Nest installs during `app.init()`.
  registerAnalyticsBodyParser(app);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.setGlobalPrefix('api');
};
