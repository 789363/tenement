import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBody, ApiTags, ApiResponse } from '@nestjs/swagger';
import { LocalStorageService } from './LocalStorageService';

@ApiTags('files')
@Controller('api/files')
export class FileUploadController {
  constructor(private readonly localStorageService: LocalStorageService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload a file',
  })
  @ApiResponse({ status: 200, description: 'File uploaded successfully' })
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const fileUrl = await this.localStorageService.saveFile(file);
    return {
      message: 'File uploaded successfully',
      url: fileUrl,
    };
  }
}