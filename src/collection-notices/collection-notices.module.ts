import { Module } from '@nestjs/common';
import { CollectionNoticeController } from './collection-notices.controller';
import { CollectionNoticeService } from './collection-notices.service';
import { PrismaService } from '../../prisma/prisma.service';
@Module({
  controllers: [CollectionNoticeController],
  providers: [CollectionNoticeService, PrismaService],
})
export class CollectionNoticeModule { }
