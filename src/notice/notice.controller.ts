import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { NoticeService } from './notice.service';
import {
  CreateCollectionNoticeDto,
  UpdateCollectionNoticeDto,
  CreateTenementNoticeDto,
  UpdateTenementNoticeDto,
} from './dto/notice.dto';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../auth/admin.guard';
import { ParseIntPipe } from '@nestjs/common';

@ApiTags('notices')
@Controller('notices')
export class NoticeController {
  constructor(private noticeService: NoticeService) {}

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @ApiBearerAuth()
  @Get(':id/:type')
  @ApiOperation({ summary: 'Get notice by ID and type' })
  @ApiParam({ name: 'id', description: 'Notice ID' })
  @ApiParam({
    name: 'type',
    description: 'Notice type (collection or tenement)',
  })
  @ApiResponse({ status: 200, description: 'Notice retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Notice not found' })
  getNoticeByIdAndType(
    @Param('id', ParseIntPipe) id: number,
    @Param('type') type: string,
  ) {
    return this.noticeService.getNoticeByIdAndType(id, type);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @ApiBearerAuth()
  @Post('/:type')
  @ApiOperation({ summary: 'Create new notices' })
  @ApiParam({
    name: 'type',
    description: 'Notice type (collection or tenement)',
  })
  @ApiResponse({ status: 200, description: 'Notices created successfully' })
  createNotices(
    @Param('type') type: string,
    @Body()
    noticeDataArray: CreateCollectionNoticeDto[] | CreateTenementNoticeDto[],
    @Request() req,
  ) {
    const userId = req.user.userId; // 提取用户 ID
    return this.noticeService.createNotices(type, noticeDataArray, userId);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @ApiBearerAuth()
  @Put('/:type')
  @ApiOperation({ summary: 'Update multiple notices' })
  @ApiParam({
    name: 'type',
    description: 'Notice type (collection or tenement)',
  })
  @ApiResponse({ status: 200, description: 'Notices updated successfully' })
  updateNotices(
    @Param('type') type: string,
    @Body()
    noticeDataArray: (UpdateCollectionNoticeDto | UpdateTenementNoticeDto)[],
  ) {
    return this.noticeService.updateNotices(type, noticeDataArray);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @ApiBearerAuth()
  @Delete(':id/:type')
  @ApiOperation({ summary: 'Delete a notice' })
  @ApiParam({ name: 'id', description: 'Notice ID' })
  @ApiParam({
    name: 'type',
    description: 'Notice type (collection or tenement)',
  })
  @ApiResponse({ status: 200, description: 'Notice deleted successfully' })
  @ApiResponse({ status: 404, description: 'Notice not found' })
  deleteNotice(@Param('id') id: number, @Param('type') type: string) {
    return this.noticeService.deleteNotice(id, type);
  }
}
