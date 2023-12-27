// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { AuthModule } from './auth/auth.module'; // 导入 AuthModule
import { CollectionService } from './collection/collection.service';
import { MService } from './m/m.service';
import { CollectionController } from './collection/collection.controller';
import { ModuleController } from './module/module.controller';
import { ConllectioonModule } from './conllectioon/conllectioon.module';
import { ConllectionModule } from './conllection/conllection.module';
import { CollectionModule } from './collection/collection.module';
@Module({
  imports: [
    UsersModule,
    AuthModule,
    ConllectioonModule,
    ConllectionModule,
    CollectionModule, // 添加 AuthModule
  ],
  controllers: [
    AppController,
    UsersController,
    CollectionController,
    ModuleController,
    
  
  ],
  providers: [AppService, CollectionService, MService],
})
export class AppModule {}
