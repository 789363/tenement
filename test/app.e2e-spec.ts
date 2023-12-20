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


  it('/users/login (POST)', async () => {
    return request(app.getHttpServer())
      .post('/users/login')
      .send({
        user_email: 'test@example.com',
        user_password: 'password123',
      })
      .expect(201) // 假设登录成功返回状态码是 200
      .then(response => {
        expect(response.body).toHaveProperty('access_token'); // 假设成功登录会返回 access_token
        console.log('JWT Token:', response.body.access_token);
      });
  });


  // 添加更多测试用例：登录、更新、删除

  afterAll(async () => {
    await app.close();
  });
});
