import { Module } from '@nestjs/common';
import { NoticesController } from './notice.controller';
import { NoticesService } from './notice.service';
import { PrismaService } from '../../prisma/prisma.service';
@Module({

  controllers: [NoticesController],
  providers: [NoticesService, PrismaService]
})
export class NoticesModule { }
