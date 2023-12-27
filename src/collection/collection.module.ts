import { Module } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CollectionController } from './collection.controller';
import { PrismaService } from '../../prisma/prisma.service'; // 导入 PrismaService
@Module({
    controllers: [CollectionController],
    providers: [CollectionService, PrismaService],
})
export class CollectionModule { }
