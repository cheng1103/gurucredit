import { Logger } from '@nestjs/common';
import express from 'express';
import type { NextFunction, Request, Response } from 'express';
import type { NestExpressApplication } from '@nestjs/platform-express';

/**
 * Full path of the public ingestion route, including the global `api` prefix.
 * Kept here rather than derived, because the middleware below is mounted on
 * the raw Express instance where Nest's prefix does not apply.
 */
export const ANALYTICS_TRACK_PATH = '/api/analytics/track';

/**
 * The browser beacon posts roughly 200 bytes. 4kb is generous for it and far
 * below body-parser's 100kb default, so a runaway or hostile client is
 * rejected cheaply instead of being buffered.
 */
export const ANALYTICS_TRACK_BODY_LIMIT = '4kb';

const logger = new Logger('AnalyticsBodyParser');

/** Body-parser failure shapes. Deliberately not matched on `message`: a JSON
 *  parse error embeds the offending body, which must never be logged. */
const PARSER_ERROR_TYPES = new Set([
  'entity.too.large',
  'entity.parse.failed',
  'entity.verify.failed',
  'request.aborted',
  'request.size.invalid',
  'charset.unsupported',
  'encoding.unsupported',
  'parameters.too.many',
]);

interface ParserError extends Error {
  type?: unknown;
  status?: unknown;
  statusCode?: unknown;
}

const isBodyParserError = (error: unknown): error is ParserError => {
  if (error === null || typeof error !== 'object') return false;
  const candidate = error as ParserError;
  if (
    typeof candidate.type === 'string' &&
    PARSER_ERROR_TYPES.has(candidate.type)
  ) {
    return true;
  }
  if (candidate.name === 'PayloadTooLargeError') return true;
  if (error instanceof SyntaxError) return true;
  const status = candidate.status ?? candidate.statusCode;
  return typeof status === 'number' && status >= 400 && status < 500;
};

/**
 * Wires the public `POST /api/analytics/track` route so it can answer 204 on
 * every path — including the ones the controller never sees.
 *
 * Nest's Express adapter installs a single global `express.json()` during
 * `app.init()` with body-parser's 100kb default. That parser runs *before*
 * routing, so an oversized body is rejected with Express's default 413 error
 * page and `AnalyticsController.track`'s own try/catch never executes. The
 * endpoint's whole design goal is "can never break a page", so a 413 — a
 * response distinguishable from normal traffic — is a contract violation.
 *
 * Two middlewares, both scoped to this one path and both registered before
 * `app.init()` so they sit ahead of the global parser in the Express stack:
 *
 *  1. `express.json({ limit: '4kb' })`. It sets `req._body`, so the global
 *     parser skips the request entirely and its 100kb limit never applies
 *     here. Every other route keeps the global parser's behaviour unchanged.
 *  2. An error handler, mounted immediately after so that `next(err)` from
 *     step 1 lands in it, that answers 204 instead of letting Express's
 *     default error response through. body-parser drains the request before
 *     reporting the error, so replying here cannot strand the connection.
 *
 * Must be called after `app.enableCors()` so a rejected cross-origin beacon
 * still gets its CORS headers, and before `app.init()`/`app.listen()`.
 */
export const registerAnalyticsBodyParser = (
  app: NestExpressApplication,
): void => {
  const parse = express.json({ limit: ANALYTICS_TRACK_BODY_LIMIT });

  // The wrapper is NOT cosmetic. `express.json()` returns a function literally
  // named `jsonParser`, and Nest's `ExpressAdapter.registerParserMiddleware`
  // decides whether to install the *global* parser by scanning the Express
  // stack for a layer whose handler has that name. Mounting the raw parser
  // here would therefore suppress JSON body parsing for every other route in
  // the application. Renaming the layer keeps the two independent; the test
  // 'leaves the global 100kb parser alone for other routes' pins this down.
  app.use(
    ANALYTICS_TRACK_PATH,
    function analyticsTrackJsonParser(
      req: Request,
      res: Response,
      next: NextFunction,
    ) {
      parse(req, res, next);
    },
  );

  app.use(
    ANALYTICS_TRACK_PATH,
    (error: unknown, _req: Request, res: Response, next: NextFunction) => {
      if (res.headersSent) {
        next(error);
        return;
      }
      if (!isBodyParserError(error)) {
        next(error);
        return;
      }

      // Only the failure kind, never the message or the body: a parse error
      // carries the offending payload and this endpoint logs no request data.
      const kind =
        typeof error.type === 'string'
          ? String(error.type)
          : error instanceof Error
            ? error.name
            : 'unknown';
      logger.debug(`Page view beacon rejected by the body parser: ${kind}`);
      res.status(204).end();
    },
  );
};
