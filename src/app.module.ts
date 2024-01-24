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
import { NoticesModule } from './notice/notice.module';
import { FileUploadController } from './upload/upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { TenementModule } from './tenement/tenement.module';
import { CalendarModule } from './calendar/calendar.module';
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
  ],
  providers: [AppService, CollectionService, PrismaService],
})
export class AppModule {}
