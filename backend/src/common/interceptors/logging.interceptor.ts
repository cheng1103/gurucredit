import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppLoggerService } from '../logger/app-logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: AppLoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const http = context.switchToHttp();
    const req = http.getRequest<
      Request & { user?: { id: string; email?: string } }
    >();
    const res = http.getResponse<Response>();
    const { method, url } = req;
    const started = Date.now();

    return next.handle().pipe(
      tap({
        next: () => {
          const duration = Date.now() - started;
          this.logger.logHttp({
            method,
            url,
            statusCode: res.statusCode,
            duration,
            userId: req.user?.id,
            userEmail: req.user?.email,
          });
        },
        error: (err: unknown) => {
          const duration = Date.now() - started;
          const status = this.resolveStatusCode(err, res.statusCode);
          const errorMessage =
            err instanceof Error
              ? err.message
              : typeof err === 'string'
                ? err
                : 'Unknown error';
          const errorStack = err instanceof Error ? err.stack : undefined;
          this.logger.logHttp({
            method,
            url,
            statusCode: status,
            duration,
            userId: req.user?.id,
            userEmail: req.user?.email,
            errorMessage,
          });
          this.logger.error(errorMessage, errorStack, 'HTTP');
        },
      }),
    );
  }

  private resolveStatusCode(err: unknown, fallback: number) {
    if (
      err &&
      typeof err === 'object' &&
      'status' in err &&
      typeof (err as { status?: unknown }).status === 'number'
    ) {
      return (err as { status: number }).status;
    }

    if (
      err &&
      typeof err === 'object' &&
      'statusCode' in err &&
      typeof (err as { statusCode?: unknown }).statusCode === 'number'
    ) {
      return (err as { statusCode: number }).statusCode;
    }

    return fallback >= 400 ? fallback : 500;
  }
}
