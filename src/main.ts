import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { json } from 'express';
import { AppModule } from './app.module';
import { SwaggerInit } from './swagger/swagger.config';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import helmet from 'helmet';
import {
  HttpException,
  HttpStatus,
  ValidationError,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import * as basicAuth from 'express-basic-auth';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LanguageEnum } from '@app/lib';
import { AllExceptionsFilter } from './common';

async function bootstrap() {
  // Create the HTTP server
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  // Logger configuration
  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());

  // Helmet for security headers
  app.use(helmet());

  // Validator configuration
  const validatorOptions = {
    whitelist: true,
    transform: true,
    exceptionFactory: (errors: ValidationError[]) => {
      return new HttpException(errors, HttpStatus.NOT_ACCEPTABLE);
    },
  };
  app.useGlobalPipes(new ValidationPipe(validatorOptions));

  // API versioning configuration
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Swagger configuration with basic authentication
  app.use(
    ['/api-docs', '/docs-json'],
    basicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('URL Shortener API')
    .setDescription('REST API for shortening URLs and tracking visits')
    .setVersion('1.0')
    .addBearerAuth()
    .addGlobalParameters({
      name: 'accept-language',
      required: false,
      explode: true,
      in: 'header',
      schema: { type: 'string', enum: Object.values(LanguageEnum) },
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  // Global exception filter configuration
  app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost)));

  // CORS configuration
  const ORIGIN = process.env.ORIGIN || '*';
  app.enableCors({ origin: ORIGIN });

  // Define the application port
  const PORT = process.env.PORT || 3000;

  // await prismaService.enableShutDownHooks(app);

  // Enable shutdown hooks
  // app.enableShutdownHooks();

  await app.listen(PORT);

  console.log(`Server running on ${await app.getUrl()})`);
  console.log(`Swagger running on ${await app.getUrl()}/api-docs`);
}

bootstrap();
