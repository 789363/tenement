import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as moment from 'moment';
import * as archiver from 'archiver'; // 導入 archiver
@Injectable()
export class BackupService {
  private backupCount = 0; // 新增變量來跟踪備份次數

  @Cron('0 0 0 * * 0') // 每周日的午夜 00:00 執行
  async handleCron() {
    await this.backupData();
    this.backupCount++; // 每次備份後增加計數器
    if (this.backupCount % 5 === 0) {
      await this.deleteOldestBackup();
    }
  }

  private async backupData() {
    try {
      const timestamp = moment().format('YYYYMMDD_HHmmss');
      const backupRoot = path.join(__dirname, '../../../src/backup');
      const backupDir = path.join(backupRoot, timestamp);

      await fs.ensureDir(backupDir);

      const srcPublicDir = path.join(__dirname, '../../../src/public');
      console.log(`Source Public Directory: ${srcPublicDir}`);
      const destPublicDir = path.join(backupDir, 'public');
      const srcDbFile = path.join(__dirname, '../../../prisma/dev.db');
      console.log(`Source DB File: ${srcDbFile}`);
      const destDbFile = path.join(backupDir, 'dev.db');

      await fs.copy(srcPublicDir, destPublicDir);
      await fs.copy(srcDbFile, destDbFile);

      // 壓縮備份目錄
      const output = fs.createWriteStream(`${backupDir}.zip`);
      const archive = archiver('zip', {
        zlib: { level: 9 }, // 壓縮等級設定
      });

      archive.on('error', function (err) {
        throw err;
      });

      archive.pipe(output);
      archive.directory(backupDir, false);
      await archive.finalize();

      console.log(`Backup and compression completed at ${timestamp}!`);

      // 壓縮完成後，刪除原備份目錄
      await fs.remove(backupDir);
    } catch (error) {
      console.error('Backup or compression failed:', error);
    }
  }

  private async deleteOldestBackup() {
    const backupRoot = path.join(__dirname, '../../../src/backup');
    const directories = await fs.readdir(backupRoot);
    const sortedDirs = directories
      .map((dir) => ({
        name: dir,
        time: fs.statSync(path.join(backupRoot, dir)).mtime.getTime(),
      }))
      .sort((a, b) => a.time - b.time);

    if (sortedDirs.length > 0) {
      const oldest = sortedDirs[0].name;
      await fs.remove(path.join(backupRoot, oldest));
      console.log(`Oldest backup ${oldest} deleted!`);
    }
  }
}
