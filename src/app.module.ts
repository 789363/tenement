// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { AuthModule } from './auth/auth.module';
import { CollectionService } from './collection/collection.service';
import { CollectionController } from './collection/collection.controller';
import { CollectionModule } from './collection/collection.module';
import { PrismaService } from '../prisma/prisma.service';
import { NoticesModule } from './notice/notice.module';
import { FileUploadController } from './upload/FileUploadController';
import { MulterModule } from '@nestjs/platform-express';
import { TenementModule } from './tenement/tenement.module';
import { CalendarModule } from './calendar/calendar.module';
import { TenementController } from './tenement/tenement.controller';
import { TenementService } from './tenement/tenement.service';
import { NoticeService } from './notice/notice.service';
import { NoticeController } from './notice/notice.controller';
import { CalendarController } from './calendar/calendar.controller';
import { CalendarService } from './calendar/calendar.service';
import { LocalStorageService } from './upload/LocalStorageService';
@Module({
  imports: [
    UsersModule,
    AuthModule,
    CollectionModule,
    NoticesModule,
    MulterModule.register({
      dest: './src/public',
    }),
    TenementModule,
    CalendarModule,
  ],
  controllers: [
    AppController,
    UsersController,
    CollectionController,
    FileUploadController,
    TenementController,
    NoticeController,
    CalendarController,
  ],
  providers: [
    AppService,
    CollectionService,
    PrismaService,
    TenementService,
    NoticeService,
    CalendarService,
    LocalStorageService,
  ],
})
export class AppModule {}
