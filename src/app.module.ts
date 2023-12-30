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
import { CollectionNoticesService } from './collection-notices/collection-notices.service';
import { CollectionNoticesModule } from './collection-notices/collection-notices.module';
@Module({
  imports: [
    UsersModule,
    AuthModule,
    CollectionModule,
    CollectionNoticesModule, // 添加 AuthModule
  ],
  controllers: [
    AppController,
    UsersController,
    CollectionController,


  ],
  providers: [AppService, CollectionService, PrismaService, CollectionNoticesService],
})
export class AppModule { }
