import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { CreateNoticeDto, UpdateNoticeDto } from './dto/notice.dto';


@Controller('api/notices')
export class NoticeController {
    constructor(private noticeService: NoticeService) { }

    @Get(':id/:type')
    getNoticeByIdAndType(@Param('id') id: number, @Param('type') type: string) {
        return this.noticeService.getNoticeByIdAndType(id, type);
    }

    @Post()
    createNotice(@Body() noticeData: CreateNoticeDto) {
        return this.noticeService.createNotice(noticeData);
    }

    @Put(':id')
    updateNotice(@Param('id') id: number, @Body() noticeData: UpdateNoticeDto) {
        return this.noticeService.updateNotice(id, noticeData);
    }

    @Delete(':id')
    deleteNotice(@Param('id') id: number) {
        return this.noticeService.deleteNotice(id);
    }
}