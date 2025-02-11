import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { BadRequestResponse } from './responses/bad-request.schema';
import { NotFoundResponse } from './responses/not-found.schema';
import { OkResponse } from './responses/ok-response.schema';
import { conflictResponse } from './responses/conflict.schema';

export class SwaggerInit {
  static init(app: INestApplication) {
    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('The Url Shortner App API')
      .setDescription('The Url Shortner App API description')
      .setVersion('1.0')
      .addServer(
        process.env.NODE_ENV === 'production'
          ? 'https://url-shortener.com'
          : 'http://localhost:3000',
      )
      .build();

    const options: SwaggerDocumentOptions = {
      operationIdFactory: (controllerKey: string, methodKey: string) =>
        methodKey,
      extraModels: [
        conflictResponse,
        BadRequestResponse,
        NotFoundResponse,
        OkResponse,
      ],
    };

    const document = SwaggerModule.createDocument(app, config, options);
    SwaggerModule.setup('api/v1/docs', app, document);
  }
}
