import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CalendarService } from './calendar.service';

@ApiTags('calendar')
@Controller('api/calendar')
export class CalendarController {
    constructor(private calendarService: CalendarService) { }

    @Get(':year/:month')
    @ApiOperation({ summary: 'Get calendar events' })
    @ApiResponse({ status: 200, description: 'Successfully retrieved calendar events.' })
    @ApiResponse({ status: 404, description: 'Events not found' })
    async getCalendarEvents(@Param('year') year: number, @Param('month') month: number) {
        return this.calendarService.getCalendarEvents(year, month);
    }

    @Get('collection-notices/:year/:month')
    @ApiOperation({ summary: 'Get collection notices' })
    @ApiResponse({ status: 200, description: 'Successfully retrieved collection notices.' })
    @ApiResponse({ status: 404, description: 'Notices not found' })
    async getCollectionNotices(@Param('year') year: number, @Param('month') month: number) {
        return this.calendarService.getCollectionNotices(year, month);
    }
}
