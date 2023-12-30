import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NoticesService } from './notice.service';
import { GetNoticesDto } from './dto/get-notices.dto';

@ApiTags('notices')
@Controller('notices')
export class NoticesController {
    constructor(private noticesService: NoticesService) { }
    @Get(':year/:month')
    @ApiOperation({ summary: 'Get notices by year and month' })
    @ApiResponse({ status: 200, description: 'Successfully retrieved data' })
    async getNotices(@Param() params: GetNoticesDto) {
        const data = await this.noticesService.getNotices(params.year, params.month);
        return {
            message: '成功新增資料',
            data: data,
        };
    }

}
