import { ConsoleLogger, Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createWriteStream, mkdirSync } from 'node:fs';
import type { WriteStream } from 'node:fs';
import { dirname, isAbsolute, join } from 'node:path';

export interface HttpLogPayload {
  method: string;
  url: string;
  statusCode: number;
  duration: number;
  userId?: string;
  userEmail?: string;
  errorMessage?: string;
}

@Injectable()
export class AppLoggerService extends ConsoleLogger implements OnModuleDestroy {
  private readonly logStream?: WriteStream;

  constructor(private readonly configService: ConfigService) {
    super('AppLogger', { timestamp: true });
    const logFile = this.configService.get<string>('LOG_FILE');
    if (logFile) {
      const resolvedPath = isAbsolute(logFile)
        ? logFile
        : join(process.cwd(), logFile);
      mkdirSync(dirname(resolvedPath), { recursive: true });
      this.logStream = createWriteStream(resolvedPath, { flags: 'a' });
      super.log(
        `Structured logs will also be written to ${resolvedPath}`,
        'Logger',
      );
    }
  }

  log(message: string, context?: string) {
    super.log(message, context);
    this.persistStructured('log', message, context);
  }

  warn(message: string, context?: string) {
    super.warn(message, context);
    this.persistStructured('warn', message, context);
  }

  error(message: string, stack?: string, context?: string) {
    super.error(message, stack, context);
    this.persistStructured('error', message, context, stack);
  }

  logHttp(payload: HttpLogPayload) {
    const baseMessage = `${payload.method} ${payload.url} ${payload.statusCode} ${payload.duration}ms user=${
      payload.userId ?? 'anonymous'
    }`;
    super.log(baseMessage, 'HTTP');
    this.writeLine({
      level: 'http',
      timestamp: new Date().toISOString(),
      ...payload,
    });
  }

  private persistStructured(
    level: string,
    message: string,
    context?: string,
    stack?: string,
  ) {
    this.writeLine({
      level,
      timestamp: new Date().toISOString(),
      context,
      message,
      stack,
    });
  }

  private writeLine(payload: Record<string, any>) {
    if (!this.logStream) {
      return;
    }
    this.logStream.write(`${JSON.stringify(payload)}\n`);
  }

  onModuleDestroy() {
    this.logStream?.end();
  }
}
