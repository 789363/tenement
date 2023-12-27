import { Controller, Post, Put, Body, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { CollectionService } from './collection.service'
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { DeleteCollectionDto } from './dto/delete-collection.dto';
@ApiTags('collections')
@Controller('collections')
export class CollectionController {
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

    @Put()
    @ApiOperation({ summary: 'Update a new collection' })
    @ApiResponse({ status: 201, description: 'Successfully Updated the collection' })
    updateCollection(@Body() updateCollectionDto: UpdateCollectionDto) {
        const updatedCollection = this.collectionsService.updateCollection(updateCollectionDto.collection_id, updateCollectionDto);
        return {
            message: 'Successfully updated the collection',
            data: updatedCollection,
        };
    }

    @Delete()
    @ApiOperation({ summary: 'Delete a  collection' })
    @ApiResponse({ status: 201, description: 'Successfully Deleted the collection' })
    deleteCollection(@Body() deleteCollectionDto: DeleteCollectionDto) {
        const deleteCollection = this.collectionsService.deleteCollection(deleteCollectionDto.tenement_id, deleteCollectionDto.collection_id);
        return {
            message: 'Successfully Deleted the collection',
            data: deleteCollection,
        };
    }


}
