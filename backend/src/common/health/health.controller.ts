import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Controller('health')
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  /** Liveness — process is up and responding. */
  @Get()
  liveness() {
    return {
      status: 'ok',
      service: 'guru-credits-api',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };
  }

  /** Readiness — DB roundtrip succeeded. Used by orchestrators (Railway/Render/Fly) to route traffic only when DB is live. */
  @Get('ready')
  async readiness() {
    try {
      // A trivial query — Prisma MongoDB does not expose $queryRaw, so use a known cheap model.
      await this.prisma.service.count({ take: 1 });
      return { status: 'ready', db: 'ok', timestamp: new Date().toISOString() };
    } catch (err) {
      return {
        status: 'degraded',
        db: 'unreachable',
        error: err instanceof Error ? err.message : String(err),
        timestamp: new Date().toISOString(),
      };
    }
  }
}
