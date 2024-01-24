import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../auth/admin.guard';
import { CreateTenementRentDto } from './dto/creat-rent.dto';
import { TenementService } from './tenement.service';
@ApiTags('tenements')
@Controller('api/tenements')
export class TenementController {
  constructor(
    private tenementService: TenementService,
    private prisma: PrismaService,
  ) {}

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Get()
  @ApiOperation({ summary: 'Get all tenements' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all tenements.',
  })
  @ApiResponse({ status: 404, description: 'Tenement not found' })
  async getAllTenements(@Request() req) {
    const userisAdmin = req.user.isAdmin;
    if (userisAdmin === 'admin') {
      return this.tenementService.getAllTenements();
    } else {
      return this.tenementService.getTenementsByUserId(req.user.userId);
    }
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Get('/sell')
  @ApiOperation({ summary: 'Get all tenement sells' })
  async getAllTenementSells(@Request() req) {
    const userisAdmin = req.user.isAdmin;
    return this.tenementService.getAllTenementSells(
      userisAdmin === true,
      req.user.userId,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/rent')
  @ApiOperation({ summary: 'Get all tenement rents' })
  async getAllTenementRents(@Request() req) {
    const userisAdmin = req.user.isAdmin;
    return this.tenementService.getAllTenementRents(
      userisAdmin === true,
      req.user.userId,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/edit/sell/:id')
  @ApiOperation({ summary: 'Get a specific tenement sell for editing' })
  async getTenementSellById(
    @Param('id', ParseIntPipe) tenementId: number,
    @Request() req,
  ) {
    const userisAdmin = req.user.isAdmin;
    return this.tenementService.getTenementSellById(
      tenementId,
      req.user.userId,
      userisAdmin,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/edit/rent/:id')
  @ApiOperation({
    summary: 'Get details of a specific tenement rent for editing',
  })
  async getTenementRentById(
    @Param('id', ParseIntPipe) tenementId: number,
    @Request() req,
  ) {
    const userisAdmin = req.user.isAdmin;
    return this.tenementService.getTenementRentById(
      tenementId,
      req.user.userId,
      userisAdmin,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/edit/develop/:id')
  @ApiOperation({
    summary: 'Get details of a specific tenement develop for editing',
  })
  async getTenementDevelopById(
    @Param('id', ParseIntPipe) tenementId: number,
    @Request() req,
  ) {
    const userisAdmin = req.user.isAdmin;
    return this.tenementService.getTenementDevelopById(
      tenementId,
      req.user.userId,
      userisAdmin,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/edit/market/:id')
  @ApiOperation({
    summary: 'Get details of a specific tenement market for editing',
  })
  async getTenementMarketDetails(
    @Param('id', ParseIntPipe) tenementId: number,
    @Request() req,
  ) {
    const userisAdmin = req.user.isAdmin;
    return this.tenementService.getTenementMarketById(
      tenementId,
      req.user.userId,
      userisAdmin,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/tenement/add/rent')
  @ApiOperation({ summary: 'Add new tenement rent' })
  async createTenementRent(
    @Body() createTenementRentDto: CreateTenementRentDto,
  ) {
    return this.tenementService.createTenementRent(createTenementRentDto);
  }
}
