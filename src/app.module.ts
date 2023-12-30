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
import { NoticeModule } from './notice/notice.module';
import { MulterService } from './multer/multer.service';
import { MulterController } from './multer/multer.controller';
import { MulterService } from './multer/multer.service';
@Module({
  imports: [
    UsersModule,
    AuthModule,
    CollectionModule,
    CollectionNoticeModule,
    NoticeModule, // 添加 AuthModule
  ],
  controllers: [
    AppController,
    UsersController,
    CollectionController,
    MulterController,


  ],
  providers: [AppService, CollectionService, PrismaService, CollectionNoticeService, MulterService],
})
export class AppModule { }
