import { Controller, Get, Param } from '@nestjs/common';
import { CalendarService } from './calendar.service';

@Controller('api/calendar')
export class CalendarController {
    constructor(private calendarService: CalendarService) { }

    @Get(':year/:month')
    async getCalendarEvents(@Param('year') year: number, @Param('month') month: number) {
        return this.calendarService.getCalendarEvents(year, month);
    }

    @Get('collection/:year/:month')
    async getCollectionEvents(@Param('year') year: number, @Param('month') month: number) {
        return this.calendarService.getCollectionNotices(year, month);
    }
}
