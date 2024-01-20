import { Module } from '@nestjs/common';
import { TenementService } from './tenement.service';
import { TenementController } from './tenement.controller';

@Module({
  controllers: [TenementController],
  providers: [TenementService],
})
export class TenementModule { }
