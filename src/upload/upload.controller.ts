// src/upload/upload.controller.ts

import { Controller, Post, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import * as multer from 'multer';
import { join } from 'path';

@Controller('upload')
export class UploadController {
    @Post()
    @UseInterceptors(FileInterceptor('file', {
        storage: multer.diskStorage({
            destination: join(__dirname, '..', 'public'),
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                const filename = `${uniqueSuffix}-${file.originalname}`;
                callback(null, filename);
            }
        })
    }))
    async uploadFile(@UploadedFile() file: Express.Multer.File, @Res() res: Response) {
        const fileUrl = `http://localhost:3000/public/${file.filename}`;
        return res.json({
            message: "Successfully upload the image",
            data: { url: fileUrl }
        });
    }
}
