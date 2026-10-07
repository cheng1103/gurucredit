import { CallHandler, ExecutionContext } from '@nestjs/common';
import { firstValueFrom, of, throwError } from 'rxjs';
import { AppLoggerService } from '../logger/app-logger.service';
import { LoggingInterceptor } from './logging.interceptor';

interface LoggerMock {
  logHttp: jest.Mock;
  error: jest.Mock;
}

const newLogger = (): LoggerMock => ({
  logHttp: jest.fn(),
  error: jest.fn(),
});

const contextFor = (originalUrl: string, method = 'POST'): ExecutionContext => {
  const req = { method, url: originalUrl, originalUrl };
  const res = { statusCode: 204 };
  return {
    switchToHttp: () => ({
      getRequest: () => req,
      getResponse: () => res,
    }),
  } as unknown as ExecutionContext;
};

const handlerOf = (observable: CallHandler['handle']): CallHandler =>
  ({ handle: observable }) as CallHandler;

const ok: CallHandler = handlerOf(() => of('body'));

describe('LoggingInterceptor', () => {
  let logger: LoggerMock;
  let interceptor: LoggingInterceptor;

  beforeEach(() => {
    logger = newLogger();
    interceptor = new LoggingInterceptor(logger as unknown as AppLoggerService);
  });

  it('logs a normal request', async () => {
    await firstValueFrom(interceptor.intercept(contextFor('/api/contact'), ok));

    expect(logger.logHttp).toHaveBeenCalledWith(
      expect.objectContaining({ method: 'POST', url: '/api/contact' }),
    );
  });

  it('does not log the analytics beacon', async () => {
    // This route fires on every public page view by design; logging it would
    // make it the dominant line in the production log stream.
    const result = await firstValueFrom(
      interceptor.intercept(contextFor('/api/analytics/track'), ok),
    );

    expect(result).toBe('body');
    expect(logger.logHttp).not.toHaveBeenCalled();
    expect(logger.error).not.toHaveBeenCalled();
  });

  it('does not log the analytics beacon when it fails either', async () => {
    const failing = handlerOf(() => throwError(() => new Error('mongo down')));

    await expect(
      firstValueFrom(
        interceptor.intercept(contextFor('/api/analytics/track'), failing),
      ),
    ).rejects.toThrow('mongo down');
    expect(logger.logHttp).not.toHaveBeenCalled();
    expect(logger.error).not.toHaveBeenCalled();
  });

  it('still logs the admin analytics read', async () => {
    // Only the ingestion route is high volume; the admin read must stay
    // auditable.
    await firstValueFrom(
      interceptor.intercept(contextFor('/api/analytics/overview', 'GET'), ok),
    );

    expect(logger.logHttp).toHaveBeenCalledTimes(1);
  });

  it('skips the beacon even with a trailing slash or a query string', async () => {
    await firstValueFrom(
      interceptor.intercept(contextFor('/api/analytics/track/'), ok),
    );
    await firstValueFrom(
      interceptor.intercept(contextFor('/api/analytics/track?x=1'), ok),
    );

    expect(logger.logHttp).not.toHaveBeenCalled();
  });

  it('does not skip a route that merely starts with the beacon path', async () => {
    await firstValueFrom(
      interceptor.intercept(contextFor('/api/analytics/tracker-admin'), ok),
    );

    expect(logger.logHttp).toHaveBeenCalledTimes(1);
  });

  it('redacts sensitive query values on the routes it does log', async () => {
    await firstValueFrom(
      interceptor.intercept(
        contextFor('/api/auth/me?token=supersecret&page=2', 'GET'),
        ok,
      ),
    );

    expect(logger.logHttp).toHaveBeenCalledWith(
      expect.objectContaining({
        url: '/api/auth/me?token=%5BREDACTED%5D&page=2',
      }),
    );
  });
});
