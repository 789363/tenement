import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { CreateCollectionNoticeDto, UpdateCollectionNoticeDto, CreateTenementNoticeDto, UpdateTenementNoticeDto } from './dto/notice.dto';

@Controller('api/notices')
export class NoticeController {
    constructor(private noticeService: NoticeService) { }

    @Get(':id/:type')
    getNoticeByIdAndType(@Param('id') id: number, @Param('type') type: string) {
        return this.noticeService.getNoticeByIdAndType(id, type);
    }

    @Post(':type')
    createNotice(@Param('type') type: string, @Body() noticeData: CreateCollectionNoticeDto | CreateTenementNoticeDto) {
        return this.noticeService.createNotice(type, noticeData);
    }

    @Put(':id/:type')
    updateNotice(@Param('id') id: number, @Param('type') type: string, @Body() noticeData: UpdateCollectionNoticeDto | UpdateTenementNoticeDto) {
        return this.noticeService.updateNotice(id, type, noticeData);
    }

    @Delete(':id/:type')
    deleteNotice(@Param('id') id: number, @Param('type') type: string) {
        return this.noticeService.deleteNotice(id, type);
    }
}
