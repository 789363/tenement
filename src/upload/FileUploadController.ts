import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Delete,
  Param,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiConsumes,
  ApiBody,
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { LocalStorageService } from './LocalStorageService';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/auth/admin.guard';

@ApiTags('files')
@UseGuards(AuthGuard('jwt'), AdminGuard)
@ApiBearerAuth()
@Controller('files')
export class FileUploadController {
  constructor(private readonly localStorageService: LocalStorageService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, callback) => {
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (allowedMimeTypes.includes(file.mimetype)) {
          callback(null, true);
        } else {
          callback(null, false);
        }
      },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'UploadFiles' })
  @ApiBody({
    description: 'Upload a file',
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'File uploaded successfully' })
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const fileUrl = await this.localStorageService.saveFile(file);
    return {
      message: 'File uploaded successfully',
      url: fileUrl,
    };
  }

  @Delete('delete/:filename')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a file' })
  @ApiResponse({ status: 200, description: 'File deleted successfully' })
  @ApiResponse({ status: 404, description: 'File not found' })
  async deleteFile(
    @Param('filename') filename: string,
  ): Promise<{ message: string }> {
    const isDeleted = await this.localStorageService.deleteFile(filename);
    if (!isDeleted) {
      throw new HttpException('File not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'File deleted successfully' };
  }
}
