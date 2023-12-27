import { Module } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CollectionsController } from './collection.controller';

@Module({
    controllers: [CollectionsController],
    providers: [CollectionService],
})
export class CollectionModule { }
