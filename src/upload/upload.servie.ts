import { Injectable } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { join } from 'path';

@Injectable()
export class LocalStorageService {
    constructor() { }

    public async saveFile(file: Express.Multer.File): Promise<string> {
        const filePath = join(__dirname, '../../public', file.originalname);
        const ws = createWriteStream(filePath);
        ws.write(file.buffer);
        ws.close();

        return `${process.env.BACKEND_URL}/public/${file.originalname}`;
    }
}
