import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppLoggerService } from './common/logger/app-logger.service';
import type { Request, Response, NextFunction } from 'express';
import type { NestExpressApplication } from '@nestjs/platform-express';

type CorsCallback = (err: Error | null, allow?: boolean) => void;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });
  const appLogger = app.get(AppLoggerService);
  app.useLogger(appLogger);
  const configService = app.get(ConfigService);
  app.disable('x-powered-by');
  const isProduction =
    configService.get<string>('NODE_ENV', 'development') === 'production';

  if (isProduction) {
    app.enable('trust proxy');
    app.use((req: Request, res: Response, next: NextFunction) => {
      res.setHeader(
        'Strict-Transport-Security',
        'max-age=31536000; includeSubDomains; preload',
      );
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('X-Frame-Options', 'DENY');
      res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
      next();
    });
  }

  // Enable CORS
  const corsSetting = configService.get<string>('CORS_ORIGINS');
  const allowedOrigins = corsSetting
    ? new Set(
        corsSetting
          .split(',')
          .map((origin) => origin.trim())
          .filter(Boolean),
      )
    : null;
  if (isProduction) {
    if (!allowedOrigins || allowedOrigins.size === 0) {
      throw new Error(
        'CORS_ORIGINS must include at least one explicit origin in production.',
      );
    }
    if (allowedOrigins.has('*')) {
      throw new Error(
        'CORS_ORIGINS cannot contain "*" in production. List each trusted domain instead.',
      );
    }
  }
  const allowAllOrigins = !allowedOrigins || allowedOrigins.has('*');

  app.enableCors({
    origin: (origin: string | undefined, callback: CorsCallback) => {
      if (allowAllOrigins || typeof origin !== 'string') {
        callback(null, true);
        return;
      }

      if (allowedOrigins?.has(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // API prefix
  app.setGlobalPrefix('api');

  const enableSwagger =
    configService.get<boolean>('ENABLE_SWAGGER', !isProduction) ??
    !isProduction;
  if (enableSwagger) {
    const config = new DocumentBuilder()
      .setTitle('GURU Credits API')
      .setDescription('Loan consultation and credit analysis API')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
  } else {
    appLogger.log('Swagger UI disabled for this environment.');
  }

  const port = configService.get<number>('PORT', 3001);
  const host = configService.get<string>('HOST', '0.0.0.0');
  await app.listen(port, host);
  appLogger.log(`🚀 GURU Credits API running on http://${host}:${port}`);
  appLogger.log(`📚 API Docs available at http://${host}:${port}/api/docs`);
}
void bootstrap();
