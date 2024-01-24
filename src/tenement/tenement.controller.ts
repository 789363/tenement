import {
  Controller,
  Get,
  Post,
  Delete,
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
import { CreateTenementRentDto } from './dto/create-rent.dto';
import { CreateTenementSellDto } from './dto/create-sell.dto';
import { CreateTenementDevelopDto } from './dto/create-develop.dto';
import { CreateTenementMarketDto } from './dto/create-market.dto';
import { TenementService } from './tenement.service';
import { UpdateTenementSellDto } from './dto/update-sell.dto';
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

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Get('/rent')
  @ApiOperation({ summary: 'Get all tenement rents' })
  async getAllTenementRents(@Request() req) {
    const userisAdmin = req.user.isAdmin;
    return this.tenementService.getAllTenementRents(
      userisAdmin === true,
      req.user.userId,
    );
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
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

  @UseGuards(AuthGuard('jwt'), AdminGuard)
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

  @UseGuards(AuthGuard('jwt'), AdminGuard)
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

  @UseGuards(AuthGuard('jwt'), AdminGuard)
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

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Post('/tenement/add/rent')
  @ApiOperation({ summary: 'Add new tenement rent' })
  async createTenementRent(
    @Body() createTenementRentDto: CreateTenementRentDto,
  ) {
    return this.tenementService.createTenementRent(createTenementRentDto);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Post('/tenement/add/sell')
  @ApiOperation({ summary: 'Add new tenement sell' })
  async createTenementSell(
    @Body() createTenementSellDto: CreateTenementSellDto,
  ) {
    return this.tenementService.createTenementSell(createTenementSellDto);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Post('/tenement/add/develop')
  @ApiOperation({ summary: 'Add new tenement development' })
  async createTenementDevelop(
    @Body() createTenementDevelopDto: CreateTenementDevelopDto,
  ) {
    return this.tenementService.createTenementDevelop(createTenementDevelopDto);
  }
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Post('/tenement/add/market')
  @ApiOperation({ summary: 'Add new tenement development' })
  async createTenementMarket(
    @Body() createTenementMarketDto: CreateTenementMarketDto,
  ) {
    return this.tenementService.createTenementMarket(createTenementMarketDto);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Delete('/delete/tenement/sell/:tenementId')
  @ApiOperation({ summary: 'Delete tenement sell' })
  async deleteTenementSell(
    @Param('tenementId', ParseIntPipe) tenementId: number,
  ) {
    return this.tenementService.deleteTenementSell(tenementId);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Delete('/delete/tenement/market/:tenementId')
  async deleteTenementMarket(
    @Param('tenementId', ParseIntPipe) tenementId: number,
  ) {
    return this.tenementService.deleteTenementMarket(tenementId);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Delete('/delete/tenement/develop/:tenementId')
  async deleteTenementDevelop(
    @Param('tenementId', ParseIntPipe) tenementId: number,
  ) {
    return this.tenementService.deleteTenementDevelop(tenementId);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Delete('/delete/tenement/rent/:tenementId')
  async deleteTenementRent(
    @Param('tenementId', ParseIntPipe) tenementId: number,
  ) {
    return this.tenementService.deleteTenementRent(tenementId);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Post('/tenement/edit/sell/:tenementId')
  @ApiOperation({ summary: 'Update tenement sell' })
  async updateTenementSell(
    @Param('tenementId', ParseIntPipe) tenementId: number,
    @Body() updateTenementSellDto: UpdateTenementSellDto,
  ) {
    return this.tenementService.updateTenementSell(updateTenementSellDto);
  }
}
