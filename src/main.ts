import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { join } from 'path';
import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';
async function bootstrap() {
  const uploadsDir = path.join(__dirname, '..', 'uploads');

  // 检查目录是否存在，如果不存在则创建
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Example API')
    .setDescription('The example API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use('/public', express.static(join(__dirname, '..', 'uploads'))); // 配置静态文件服务
  await app.listen(3000);
}

bootstrap();
