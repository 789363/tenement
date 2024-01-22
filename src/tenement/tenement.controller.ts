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
        const userRole = req.user.role;

        if (userRole === 'admin') {
            return this.tenementService.getAllTenements();
        } else {
            return this.tenementService.getTenementsByUserId(req.user.userId);
        }
    }

    @UseGuards(AuthGuard('jwt'), AdminGuard)
    @Get(':id')
    @ApiOperation({ summary: 'Get tenement by ID' })
    @ApiParam({ name: 'id', description: 'Tenement ID' })
    @ApiResponse({ status: 200, description: 'Tenement retrieved successfully.' })
    @ApiResponse({ status: 404, description: 'Tenement not found' })
    // 根据类型、用户ID和物业ID获取物业信息
    async getTenementByIdTypeAndUser(type: string, id: number, user: User) {
        if (user.isAdmin === true) {
            return this.getTenementByIdAndType(type, id);
        } else {
            // 如果是普通用户，确保只能获取与其相关的物业信息
            return this.getTenementByIdAndTypeForUser(type, id, user.id);
        }
    }

    // 私有方法：根据类型和ID获取物业信息
    private async getTenementByIdAndType(type: string, tenement_id: number) {
        switch (type) {
            case 'rent':
                return this.prisma.tenement_Rent.findUnique({ where: { tenement_id } });
            case 'sell':
                return this.prisma.tenement_Sell.findUnique({ where: { tenement_id } });
            case 'develop':
                return this.prisma.tenement_Develop.findUnique({ where: { tenement_id } });
            case 'market':
                return this.prisma.tenement_Market.findUnique({ where: { tenement_id } });
            default:
                return null;
        }
    }

    // 私有方法：根据类型、ID和用户ID获取物业信息
    private async getTenementByIdAndTypeForUser(type: string, tenement_id: number, user_id: number) {
        switch (type) {
            case 'rent':
                return this.prisma.tenement_Rent.findFirst({ where: { tenement_id, user_id } });
            case 'sell':
                return this.prisma.tenement_Sell.findFirst({ where: { tenement_id, user_id } });
            case 'develop':
                return this.prisma.tenement_Develop.findFirst({ where: { tenement_id, user_id } });
            case 'market':
                return this.prisma.tenement_Market.findFirst({ where: { tenement_id, user_id } });
            default:
                return null;
        }
    }


    @UseGuards(AuthGuard('jwt'), AdminGuard)
    @Post()
    @ApiOperation({ summary: 'Create a tenement' })
    @ApiBody({ description: 'Tenement Create Data', type: CreateTenementDto })
    @ApiResponse({ status: 201, description: 'Tenement created successfully.' })
    async createTenement(@Body() tenementData: CreateTenementDto) {
        return this.tenementService.createTenement(tenementData);
    }

    @UseGuards(AuthGuard('jwt'), AdminGuard)
    @Put(':id')
    @ApiOperation({ summary: 'Update a tenement' })
    @ApiParam({ name: 'id', description: 'Tenement ID' })
    @ApiBody({ description: 'Tenement Update Data', type: UpdateTenementDto })
    @ApiResponse({ status: 200, description: 'Tenement updated successfully.' })
    @ApiResponse({ status: 404, description: 'Tenement not found' })
    async updateTenement(@Param('id', ParseIntPipe) id: number, @Body() tenementData: UpdateTenementDto) {
        return this.tenementService.updateTenement(id, tenementData);
    }

    @UseGuards(AuthGuard('jwt'), AdminGuard)
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a tenement' })
    @ApiParam({ name: 'id', description: 'Tenement ID' })
    @ApiResponse({ status: 200, description: 'Tenement successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Tenement not found' })
    async deleteTenement(@Param('id', ParseIntPipe) id: number) {
        return this.tenementService.deleteTenement(id);
    }
}
