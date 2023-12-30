import { Controller, Put, Post, Body, Delete, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CollectionNoticeService } from './collection-notices.service';
import { CreateCollectionNoticeDto } from './dto/create-collection-notice.dto';
import { UpdateCollectionNoticeDto } from './dto/update-collection-notice.dto';
@ApiTags('collection-notices')
@Controller('collection-notices')
export class CollectionNoticeController {
    constructor(private collectionNoticeService: CollectionNoticeService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new collection notice' })
    @ApiResponse({ status: 201, description: 'Successfully created the collection notice' })
    createCollectionNotice(@Body() createCollectionNoticeDto: CreateCollectionNoticeDto) {
        const newNotice = this.collectionNoticeService.createCollectionNotice(createCollectionNoticeDto);
        return {
            message: 'Successfully created the collection notice',
            data: newNotice,
        };

    }
    @Delete(':noticeId')
    @ApiOperation({ summary: 'Delete a collection notice' })
    @ApiResponse({ status: 200, description: 'Successfully delete the notice data' })
    async deleteCollectionNotice(@Param('noticeId') noticeId: number) {
        await this.collectionNoticeService.deleteCollectionNotice(noticeId);
        return {
            message: 'Successfully delete the notice data',
        };
    }

    @Put(':noticeId')
    @ApiOperation({ summary: 'Update a collection notice' })
    @ApiResponse({ status: 200, description: 'Successfully update data' })
    async updateCollectionNotice(@Param('noticeId') noticeId: number, @Body() updateDto: UpdateCollectionNoticeDto) {
        const updatedNotice = await this.collectionNoticeService.updateCollectionNotice(noticeId, updateDto);
        return {
            message: 'Successfully update data',
            data: updatedNotice,
        };
    }



    // 這裡可以添加更多方法，如更新、刪除、獲取特定通知等
}
