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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../auth/admin.guard';
import { CreateTenementRentDto } from './dto/create-rent.dto';
import { CreateTenementSellDto } from './dto/create-sell.dto';
import { CreateTenementDevelopDto } from './dto/create-develop.dto';
import { CreateTenementMarketDto } from './dto/create-market.dto';
import { TenementService } from './tenement.service';
import { UpdateTenementSellDto } from './dto/update-sell.dto';
import { UpdateTenementRentDto } from './dto/update-rent.dtp';
import { UpdateTenementDevelopDto } from './dto/update-develop.dto';
import { UpdateTenementMarketDto } from './dto/update-market.dto';
@ApiTags('tenements')
@Controller('tenements')
export class TenementController {
  constructor(
    private tenementService: TenementService,
    private prisma: PrismaService,
  ) {}

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'Get all tenements' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all tenements.',
  })
  @ApiResponse({ status: 404, description: 'Tenement not found' })
  async getAllTenements(@Request() req) {
    const userisadmin = req.user.isadmin;
    if (userisadmin === 'admin') {
      return this.tenementService.getAllTenements();
    } else {
      return this.tenementService.getTenementsByUserId(req.user.userId);
    }
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @ApiBearerAuth()
  @Get('/sell')
  @ApiOperation({ summary: 'Get all tenement sells' })
  async getAllTenementSells(@Request() req) {
    const userisadmin = req.user.isadmin;
    return this.tenementService.getAllTenementSells(
      userisadmin === true,
      req.user.userId,
    );
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @ApiBearerAuth()
  @Get('/rent')
  @ApiOperation({ summary: 'Get all tenement rents' })
  async getAllTenementRents(@Request() req) {
    const userisadmin = req.user.isadmin;
    return this.tenementService.getAllTenementRents(
      userisadmin === true,
      req.user.userId,
    );
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @ApiBearerAuth()
  @Get('/edit/sell/:id')
  @ApiOperation({ summary: 'Get a specific tenement sell for editing' })
  async getTenementSellById(
    @Param('id', ParseIntPipe) tenementId: number,
    @Request() req,
  ) {
    const userisadmin = req.user.isadmin;
    return this.tenementService.getTenementSellById(
      tenementId,
      req.user.userId,
      userisadmin,
    );
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @ApiBearerAuth()
  @Get('/edit/rent/:id')
  @ApiOperation({
    summary: 'Get details of a specific tenement rent for editing',
  })
  async getTenementRentById(
    @Param('id', ParseIntPipe) tenementId: number,
    @Request() req,
  ) {
    const userisadmin = req.user.isadmin;
    return this.tenementService.getTenementRentById(
      tenementId,
      req.user.userId,
      userisadmin,
    );
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @ApiBearerAuth()
  @Get('/edit/develop/:id')
  @ApiOperation({
    summary: 'Get details of a specific tenement develop for editing',
  })
  async getTenementDevelopById(
    @Param('id', ParseIntPipe) tenementId: number,
    @Request() req,
  ) {
    const userisadmin = req.user.isadmin;
    return this.tenementService.getTenementDevelopById(
      tenementId,
      req.user.userId,
      userisadmin,
    );
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @ApiBearerAuth()
  @Get('/edit/market/:id')
  @ApiOperation({
    summary: 'Get details of a specific tenement market for editing',
  })
  async getTenementMarketDetails(
    @Param('id', ParseIntPipe) tenementId: number,
    @Request() req,
  ) {
    const userisadmin = req.user.isadmin;
    return this.tenementService.getTenementMarketById(
      tenementId,
      req.user.userId,
      userisadmin,
    );
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @ApiBearerAuth()
  @Post('/tenement/add/rent')
  @ApiOperation({ summary: 'Add new tenement rent' })
  async createTenementRent(
    @Body() createTenementRentDto: CreateTenementRentDto,
  ) {
    return this.tenementService.createTenementRent(createTenementRentDto);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @ApiBearerAuth()
  @Post('/tenement/add/sell')
  @ApiOperation({ summary: 'Add new tenement sell' })
  async createTenementSell(
    @Body() createTenementSellDto: CreateTenementSellDto,
  ) {
    return this.tenementService.createTenementSell(createTenementSellDto);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @ApiBearerAuth()
  @Post('/tenement/add/develop')
  @ApiOperation({ summary: 'Add new tenement development' })
  async createTenementDevelop(
    @Body() createTenementDevelopDto: CreateTenementDevelopDto,
  ) {
    return this.tenementService.createTenementDevelop(createTenementDevelopDto);
  }
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @ApiBearerAuth()
  @Post('/tenement/add/market')
  @ApiOperation({ summary: 'Add new tenement development' })
  async createTenementMarket(
    @Body() createTenementMarketDto: CreateTenementMarketDto,
  ) {
    return this.tenementService.createTenementMarket(createTenementMarketDto);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @ApiBearerAuth()
  @Delete('/delete/tenement/sell/:tenementId')
  @ApiOperation({ summary: 'Delete tenement sell' })
  async deleteTenementSell(
    @Param('tenementId', ParseIntPipe) tenementId: number,
  ) {
    return this.tenementService.deleteTenementSell(tenementId);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @ApiBearerAuth()
  @Delete('/delete/tenement/market/:tenementId')
  async deleteTenementMarket(
    @Param('tenementId', ParseIntPipe) tenementId: number,
  ) {
    return this.tenementService.deleteTenementMarket(tenementId);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @ApiBearerAuth()
  @Delete('/delete/tenement/develop/:tenementId')
  async deleteTenementDevelop(
    @Param('tenementId', ParseIntPipe) tenementId: number,
  ) {
    return this.tenementService.deleteTenementDevelop(tenementId);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @ApiBearerAuth()
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

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @ApiBearerAuth()
  @Post('/tenement/edit/sell/:tenementId')
  @ApiOperation({ summary: 'Update tenement sell' })
  async updateTenementRent(
    @Param('tenementId', ParseIntPipe) tenementId: number,
    @Body() updateTenementRentDto: UpdateTenementRentDto,
  ) {
    return this.tenementService.updateTenementRent(updateTenementRentDto);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @ApiBearerAuth()
  @Post('/tenement/edit/develop/:tenementId')
  async updateTenementDevelop(
    @Param('tenementId', ParseIntPipe) tenementId: number,
    @Body() updateTenementDevelopDto: UpdateTenementDevelopDto,
  ) {
    return this.tenementService.updateTenementDevelop(
      tenementId,
      updateTenementDevelopDto,
    );
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @ApiBearerAuth()
  @Post('/tenement/edit/market/:tenementId')
  async updateTenementMarket(
    @Param('tenementId', ParseIntPipe) tenementId: number,
    @Body() updateTenementMarketDto: UpdateTenementMarketDto,
  ) {
    return this.tenementService.updateTenementMarket(
      tenementId,
      updateTenementMarketDto,
    );
  }
}
