import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../auth/admin.guard';// 请确保导入正确的路径
import { TenementService } from './tenement.service';
import { CreateTenementDto, UpdateTenementDto } from './dto/tenement.dto';

@ApiTags('tenements')
@Controller('api/tenements')
export class TenementController {
    constructor(private tenementService: TenementService) { }

    @UseGuards(AuthGuard('jwt'), AdminGuard)
    @Get()
    @ApiOperation({ summary: 'Get all tenements' })
    async getAllTenements() {
        return this.tenementService.getAllTenements();
    }

    @UseGuards(AuthGuard('jwt'), AdminGuard)
    @Get(':id')
    @ApiOperation({ summary: 'Get tenement by ID' })
    @ApiParam({ name: 'id', description: 'Tenement ID' })
    async getTenementById(@Param('id', ParseIntPipe) id: number) {
        return this.tenementService.getTenementById(id);
    }

    @UseGuards(AuthGuard('jwt'), AdminGuard)
    @Post()
    @ApiOperation({ summary: 'Create a tenement' })
    @ApiBody({ description: 'Tenement Create Data', type: CreateTenementDto })
    async createTenement(@Body() tenementData: CreateTenementDto) {
        return this.tenementService.createTenement(tenementData);
    }

    @UseGuards(AuthGuard('jwt'), AdminGuard)
    @Put(':id')
    @ApiOperation({ summary: 'Update a tenement' })
    @ApiParam({ name: 'id', description: 'Tenement ID' })
    @ApiBody({ description: 'Tenement Update Data', type: UpdateTenementDto })
    @ApiResponse({ status: 200, description: 'Tenement successfully updated.' })
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
