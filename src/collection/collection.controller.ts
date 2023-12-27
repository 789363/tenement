import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateCollectionDto } from './dto/create-notice.dto';
import { CollectionService } from './collection.service'

@ApiTags('collections')
@Controller('collections')
export class CollectionsController {
    constructor(private collectionsService: CollectionService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new collection' })
    @ApiResponse({ status: 201, description: 'Successfully created the collection' })
    createCollection(@Body() createCollectionDto: CreateCollectionDto) {
        const newCollection = this.collectionsService.createCollection(createCollectionDto);
        return {
            message: 'Successfully created the collection',
            data: newCollection,
        };
    }
}
