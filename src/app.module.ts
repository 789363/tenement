// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module'; // 导入 AuthModule

@Module({
  imports: [
    UsersModule,
    AuthModule, // 添加 AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
