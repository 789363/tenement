import { Controller, Post, UseInterceptors, UploadedFile, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { LocalStorageService } from './upload.servie';

@Controller('files')
export class FileUploadController {
    constructor(private readonly localStorageService: LocalStorageService) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        const fileUrl = await this.localStorageService.saveFile(file);
        return {
            message: 'File uploaded successfully',
            url: fileUrl,
        };
    }
}
