import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../auth/admin.guard';// 请确保导入正确的路径
import { TenementService } from './tenement.service';
import { CreateTenementDto, UpdateTenementDto } from './dto/tenement.dto';
import { User } from '@prisma/client';
@ApiTags('tenements')
@Controller('api/tenements')
export class TenementController {
    constructor(private tenementService: TenementService, private prisma: PrismaService) { }


    @UseGuards(AuthGuard('jwt'), AdminGuard)
    @Get()
    @ApiOperation({ summary: 'Get all tenements' })
    @ApiResponse({ status: 200, description: 'Successfully retrieved all tenements.' })
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
    @Get('/tenements/sell')
    @ApiOperation({ summary: 'Get all tenement sells' })
    async getAllTenementSells(@Request() req) {
        const userisAdmin = req.user.isAdmin;
        return this.tenementService.getAllTenementSells(userisAdmin === true, req.user.userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/tenements/rent')
    @ApiOperation({ summary: 'Get all tenement rents' })
    async getAllTenementRents(@Request() req) {
        const userisAdmin = req.user.isAdmin;
        return this.tenementService.getAllTenementRents(userisAdmin === true, req.user.userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/tenement/edit/sell/:id')
    @ApiOperation({ summary: 'Get a specific tenement sell for editing' })
    async getTenementSellById(@Param('id', ParseIntPipe) tenementId: number, @Request() req) {
        const userisAdmin = req.user.isAdmin;
        return this.tenementService.getTenementSellById(tenementId, req.user.userId, userisAdmin);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/tenement/edit/rent/:id')
    @ApiOperation({ summary: 'Get details of a specific tenement rent for editing' })
    async getTenementRentDetailsForEdit(@Param('id', ParseIntPipe) tenementId: number, @Request() req) {
        const userisAdmin = req.user.isAdmin;
        return this.tenementService.getTenementRentById(tenementId, req.user.userId, userisAdmin);
    }

}
