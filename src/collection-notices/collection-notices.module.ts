import { Module } from '@nestjs/common';
import { CollectionNoticesController } from './collection-notices.controller';

@Module({
  controllers: [CollectionNoticesController]
})
export class CollectionNoticesModule {}
