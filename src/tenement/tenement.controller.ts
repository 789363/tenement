import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { TenementService } from './tenement.service';

@ApiTags('tenements')
@Controller('api/tenements')
export class TenementController {
    constructor(private tenementService: TenementService) { }

    @Get()
    @ApiOperation({ summary: 'Get all tenements' })
    async getAllTenements() {
        return this.tenementService.getAllTenements();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get tenement by ID' })
    async getTenementById(@Param('id') id: number) {
        return this.tenementService.getTenementById(id);
    }

    @Post()
    @ApiOperation({ summary: 'Create a tenement' })
    async createTenement(@Body() tenementData: any) {
        return this.tenementService.createTenement(tenementData);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a tenement' })
    async updateTenement(@Param('id') id: number, @Body() tenementData: any) {
        return this.tenementService.updateTenement(id, tenementData);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a tenement' })
    async deleteTenement(@Param('id') id: number) {
        return this.tenementService.deleteTenement(id);
    }
}
