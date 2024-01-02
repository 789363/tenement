// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { AuthModule } from './auth/auth.module'; // 导入 AuthModule
import { CollectionService } from './collection/collection.service';
import { CollectionController } from './collection/collection.controller';
import { CollectionModule } from './collection/collection.module';
import { PrismaService } from '../prisma/prisma.service';
import { CollectionNoticeService } from './collection-notices/collection-notices.service';
import { CollectionNoticeModule } from './collection-notices/collection-notices.module';
import { NoticesModule } from './notice/notice.module';
import { UploadController } from './upload/upload.controller';
import { MulterModule } from '@nestjs/platform-express';
@Module({
  imports: [
    UsersModule,
    AuthModule,
    CollectionModule,
    CollectionNoticeModule,
    NoticesModule,
    MulterModule.register({
      dest: './src/public',
    }),
  ],
  controllers: [
    AppController,
    UsersController,
    CollectionController,
    UploadController,
  ],
  providers: [AppService, CollectionService, PrismaService, CollectionNoticeService],
})
export class AppModule { }
