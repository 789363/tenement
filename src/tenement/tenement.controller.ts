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




}
