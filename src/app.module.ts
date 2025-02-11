import { Module, ValidationPipe } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { LoggerModule } from 'nestjs-pino';
import { validateEnv } from './common';
import { UrlsModule } from './urls/urls.module';

const PINO_LOGGER_EXCLUDE_HOSTNAME_PID = { base: undefined };

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        ...PINO_LOGGER_EXCLUDE_HOSTNAME_PID,
        level: process.env.LOG_LEVEL ?? 'info',
        transport:
          (process.env.NODE_ENV ?? 'development') === 'development' ||
          process.env.LOG_FORMAT === 'pretty'
            ? {
                target: 'pino-pretty',
                options: {
                  // options for pino-pretty here
                  colorize: true,
                  levelFirst: true,
                  translateTime: 'SYS:standard',
                  ignore:
                    'context,responseTime,trace_id,span_id,trace_flags,dd',
                  messageFormat: '{context}| {msg}',
                },
              }
            : undefined,
      },
      exclude: [],
    }),
    AuthModule,
    DatabaseModule,
    UrlsModule,
  ],
  controllers: [],
  providers: [
    // JwtService,
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
