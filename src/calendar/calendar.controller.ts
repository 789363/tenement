import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CalendarService } from './calendar.service';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../auth/admin.guard';
@ApiTags('calendar')
@Controller('calendar')
export class CalendarController {
  constructor(private calendarService: CalendarService) {}

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @ApiBearerAuth()
  @Get(':year/:month')
  @ApiOperation({ summary: 'Get calendar events' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved calendar events.',
  })
  @ApiResponse({ status: 404, description: 'Events not found' })
  async getCalendarEvents(
    @Param('year') year: number,
    @Param('month') month: number,
    @Request() req,
  ) {
    const userisadmin = req.user.isadmin;
    if (userisadmin === true) {
      return this.calendarService.getCalendarEvents(year, month);
    } else {
      return this.calendarService.getUserCalendarEvents(
        year,
        month,
        req.user.userId,
      );
    }
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Get('collection/:year/:month')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get collection notices' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved collection notices.',
  })
  @ApiResponse({ status: 404, description: 'Notices not found' })
  async getCollectionNotices(
    @Param('year') year: number,
    @Param('month') month: number,
    @Request() req,
  ) {
    const userisadmin = req.user.isadmin;
    if (userisadmin === true) {
      return this.calendarService.getCollectionNotices(year, month);
    } else {
      return this.calendarService.getUserCollectionNotices(
        year,
        month,
        req.user.userId,
      );
    }
  }
}
