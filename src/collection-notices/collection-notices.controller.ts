import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CollectionNoticeService } from './collection-notices.service';
import { CreateCollectionNoticeDto } from './dto/create-collection-notice.dto';

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

    // 這裡可以添加更多方法，如更新、刪除、獲取特定通知等
}
