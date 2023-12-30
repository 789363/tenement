import { Module } from '@nestjs/common';
import { CollectionNoticeController } from './collection-notices.controller';

@Module({
  controllers: [CollectionNoticeController]
})
export class CollectionNoticeModule { }
