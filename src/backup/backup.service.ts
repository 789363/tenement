// backup.service.ts
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as moment from 'moment';

@Injectable()
export class BackupService {
  @Cron('0 0 0 1 * *') // 秒 分 时 日 月 星期
  async handleCron() {
    await this.backupData();
  }

  private async backupData() {
    try {
      const timestamp = moment().format('YYYYMMDD_HHmmss');
      const backupRoot = path.join(__dirname, '../../../src/backup'); //指定為backup
      const backupDir = path.join(backupRoot, timestamp);

      // 确保备份目录存在
      await fs.ensureDir(backupDir);

      // 复制 public 文件夹和数据库文件
      const srcPublicDir = path.join(__dirname, '../../../src/public');
      console.log(`Source Public Directory: ${srcPublicDir}`);
      const destPublicDir = path.join(backupDir, 'public');
      const srcDbFile = path.join(__dirname, '../../../prisma/dev.db');
      console.log(`Source DB File: ${srcDbFile}`);
      const destDbFile = path.join(backupDir, 'dev.db');
      console.log(destDbFile);
      console.log(backupDir);

      await fs.copy(srcPublicDir, destPublicDir);
      await fs.copy(srcDbFile, destDbFile);

      console.log(`Backup completed at ${timestamp}!`);
    } catch (error) {
      console.error('Backup failed:', error);
    }
  }
}
