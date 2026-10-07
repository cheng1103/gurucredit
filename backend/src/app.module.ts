import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ServicesModule } from './services/services.module';
import { ApplicationsModule } from './applications/applications.module';
import { CreditAnalysisModule } from './credit-analysis/credit-analysis.module';
import { ContactModule } from './contact/contact.module';
import { NewsletterModule } from './newsletter/newsletter.module';
import { LeadsModule } from './leads/leads.module';
import { AuditLogsModule } from './audit-logs/audit-logs.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { TeamMembersModule } from './team-members/team-members.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { envValidationSchema } from './config/env.validation';
import { AppLoggerService } from './common/logger/app-logger.service';
import { SecurityModule } from './common/security/security.module';
import { HealthModule } from './common/health/health.module';
import { GLOBAL_THROTTLE_LIMIT, THROTTLE_WINDOW_MS } from './common/throttle';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidationSchema,
    }),
    PrismaModule,
    ThrottlerModule.forRoot([
      {
        ttl: THROTTLE_WINDOW_MS,
        limit: GLOBAL_THROTTLE_LIMIT,
      },
    ]),
    AuthModule,
    UsersModule,
    ServicesModule,
    ApplicationsModule,
    CreditAnalysisModule,
    ContactModule,
    NewsletterModule,
    LeadsModule,
    AuditLogsModule,
    AnalyticsModule,
    TeamMembersModule,
    SecurityModule,
    HealthModule,
  ],
  providers: [
    AppLoggerService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
