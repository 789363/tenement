import { Injectable } from '@nestjs/common';
import { createReadStream, createWriteStream } from 'fs';
import { join } from 'path';
import { promises as fs } from 'fs';
@Injectable()
export class LocalStorageService {
  constructor() {}

  public async saveFile(file: Express.Multer.File): Promise<string> {
    const targetPath = join(__dirname, '../../public', file.originalname);
    const tempPath = file.path;

    return new Promise((resolve, reject) => {
      const rs = createReadStream(tempPath);
      const ws = createWriteStream(targetPath);

      rs.on('error', (error) => reject(error));
      ws.on('error', (error) => reject(error));
      ws.on('close', () =>
        resolve(`${process.env.BACKEND_URL}/public/${file.originalname}`),
      );

      rs.pipe(ws);
    });
  }

  public async deleteFile(filename: string): Promise<boolean> {
    const filePath = join(__dirname, '../../public', filename);
    try {
      await fs.unlink(filePath);
      return true;
    } catch (err) {
      // 文件不存在或无法删除
      return false;
    }
  }
}
