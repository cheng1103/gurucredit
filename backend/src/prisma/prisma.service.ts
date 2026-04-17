import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    // Fire-and-forget connect. If Atlas is slow/unreachable at startup,
    // the Nest app must still reach its PORT so the healthcheck /api/health
    // can respond. Queries will lazy-connect on first call.
    this.$connect()
      .then(() => this.logger.log('Prisma connected to MongoDB'))
      .catch((error) => {
        const message = error instanceof Error ? error.message : String(error);
        this.logger.error(`Prisma initial $connect failed: ${message}`);
        this.logger.warn('Queries will retry on demand. Check MongoDB network access whitelist.');
      });
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
