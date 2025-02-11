import { NestFactory } from '@nestjs/core';
import { json } from 'express';
import { AppModule } from './app.module';
import { SwaggerInit } from './swagger/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.use(
    json({
      limit: '50mb',
    }),
  );
  // await prismaService.enableShutDownHooks(app);

  // Enable shutdown hooks
  app.enableShutdownHooks();

  await SwaggerInit.init(app);

  const ORIGIN = process.env.ORIGIN || '*';
  app.enableCors({ origin: ORIGIN });

  const PORT = process.env.PORT || 3000;
  // app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT);

  console.log(`Server running on ${await app.getUrl()}/api/v1`);
  console.log(`Swagger running on ${await app.getUrl()}/api/v1/docs`);
}
bootstrap();
