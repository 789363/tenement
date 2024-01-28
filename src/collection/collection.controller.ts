// src/collection/collection.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  ParseIntPipe,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../auth/admin.guard';
import { CollectionService } from './collection.service';
import { CreateCollectionDto, UpdateCollectionDto } from './dto/collection.dto';

@ApiTags('collections')
@Controller('collection')
export class CollectionController {
  constructor(private collectionService: CollectionService) {}

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @ApiBearerAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Get collection by ID' })
  @ApiParam({ name: 'id', description: 'Collection ID' })
  async getCollectionById(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ) {
    const userisadmin = req.user.isadmin;
    if (userisadmin === true) {
      return this.collectionService.getCollectionById(id);
    } else {
      // 如果用户是普通用户，只能获取与其相关的收藏信息
      return this.collectionService.getCollectionByIdAndUserId(
        id,
        req.user.userId,
      );
    }
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'Get all collections' })
  async getAllCollections(@Request() req) {
    const userisadmin = req.user.isadmin;
    if (userisadmin === true) {
      return this.collectionService.getAllCollections();
    } else {
      // 如果用户是普通用户，只能获取与其相关的收藏信息
      return this.collectionService.getCollectionsByUserId(req.user.userId);
    }
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Create a collection' })
  async createCollection(@Body() collectionData: CreateCollectionDto) {
    return this.collectionService.createCollection(collectionData);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @ApiBearerAuth()
  @Put(':id')
  @ApiOperation({ summary: 'Update a collection' })
  @ApiParam({ name: 'id', description: 'Collection ID' })
  async updateCollection(
    @Param('id', ParseIntPipe) id: number,
    @Body() collectionData: UpdateCollectionDto,
  ) {
    return this.collectionService.updateCollection(id, collectionData);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a collection' })
  @ApiParam({ name: 'id', description: 'Collection ID' })
  async deleteCollection(@Param('id', ParseIntPipe) id: number) {
    return this.collectionService.deleteCollection(id);
  }
}
