import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { CreateCollectionNoticeDto, UpdateCollectionNoticeDto, CreateTenementNoticeDto, UpdateTenementNoticeDto } from './dto/notice.dto';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('notices')
@Controller('api/notices')
export class NoticeController {
    constructor(private noticeService: NoticeService) { }

    @Get(':id/:type')
    @ApiOperation({ summary: 'Get notice by ID and type' })
    @ApiParam({ name: 'id', description: 'Notice ID' })
    @ApiParam({ name: 'type', description: 'Notice type (collection or tenement)' })
    @ApiResponse({ status: 200, description: 'Notice retrieved successfully' })
    @ApiResponse({ status: 404, description: 'Notice not found' })
    getNoticeByIdAndType(@Param('id') id: number, @Param('type') type: string) {
        return this.noticeService.getNoticeByIdAndType(id, type);
    }

    @Post(':type')
    @ApiOperation({ summary: 'Create a new notice' })
    @ApiParam({ name: 'type', description: 'Notice type (collection or tenement)' })

    @ApiResponse({ status: 201, description: 'Notice created successfully' })
    createNotice(@Param('type') type: string, @Body() noticeData: CreateCollectionNoticeDto | CreateTenementNoticeDto) {
        return this.noticeService.createNotice(type, noticeData);
    }

    @Put(':id/:type')
    @ApiOperation({ summary: 'Update an existing notice' })
    @ApiParam({ name: 'id', description: 'Notice ID' })
    @ApiParam({ name: 'type', description: 'Notice type (collection or tenement)' })

    @ApiResponse({ status: 200, description: 'Notice updated successfully' })
    updateNotice(@Param('id') id: number, @Param('type') type: string, @Body() noticeData: UpdateCollectionNoticeDto | UpdateTenementNoticeDto) {
        return this.noticeService.updateNotice(id, type, noticeData);
    }

    @Delete(':id/:type')
    @ApiOperation({ summary: 'Delete a notice' })
    @ApiParam({ name: 'id', description: 'Notice ID' })
    @ApiParam({ name: 'type', description: 'Notice type (collection or tenement)' })
    @ApiResponse({ status: 200, description: 'Notice deleted successfully' })
    @ApiResponse({ status: 404, description: 'Notice not found' })
    deleteNotice(@Param('id') id: number, @Param('type') type: string) {
        return this.noticeService.deleteNotice(id, type);
    }
}
