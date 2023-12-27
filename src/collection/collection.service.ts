import { Injectable } from '@nestjs/common';
import { CreateCollectionDto } from './dto/create-notice.dto';
@Injectable()
export class CollectionService {

    private collections: any[] = [];

    createCollection(collectionData: CreateCollectionDto): any {
        const newCollection = { id: this.collections.length + 1, ...collectionData };
        this.collections.push(newCollection);
        return newCollection;
    }
}
