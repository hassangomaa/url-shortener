import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { DatabaseService } from '../src/database/database.service';

describe('AppController (E2E)', () => {
  let app: INestApplication;
  let dbService: DatabaseService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    dbService = moduleFixture.get<DatabaseService>(DatabaseService);
  });

  it(`/GET should return "Hello World!"`, async () => {
    return request(app.getHttpServer()) // ✅ Ensure correct import
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  afterAll(async () => {
    if (dbService) {
      await dbService.close(); // ✅ Close the database properly
    }
    await app.close(); // ✅ Ensure the NestJS app instance is closed
  });
});
