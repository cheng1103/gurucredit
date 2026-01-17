import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import type { StringValue } from 'ms';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard, AdminGuard, SuperAdminGuard } from './auth.guard';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const configuredExpiresIn = config.get<string | number>(
          'JWT_EXPIRES_IN',
        );
        const expiresIn: number | StringValue =
          typeof configuredExpiresIn === 'number'
            ? configuredExpiresIn
            : ((configuredExpiresIn || '7d') as StringValue);
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn,
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, AdminGuard, SuperAdminGuard, RolesGuard],
  exports: [AuthService, AuthGuard, AdminGuard, SuperAdminGuard, RolesGuard],
})
export class AuthModule {}
