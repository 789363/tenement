import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';

describe('Users e2e test', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users/register (POST)', async () => {
    return request(app.getHttpServer())
      .post('/users/register')
      .send({
        user_name: 'TestUser',
        user_email: 'test@example.com',
        user_password: 'password123',
      })
      .expect(201);
  });

  // 添加更多测试用例：登录、更新、删除

  afterAll(async () => {
    await app.close();
  });
});
