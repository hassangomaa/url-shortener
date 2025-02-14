import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { AppService } from '../src/app.service';

describe('AppController (E2E)', () => {
  let app: INestApplication;
  let appService = { getHello: () => 'Hello World!' }; // Mock Service

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(AppService)
      .useValue(appService) // Use Mocked Service
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it(`/GET should return "Hello World!"`, async () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect(appService.getHello()); // Expect mock value
  });

  afterAll(async () => {
    await app.close();
  });
});
