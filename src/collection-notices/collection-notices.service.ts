import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCollectionNoticeDto } from './dto/create-collection-notice.dto';
import { UpdateCollectionNoticeDto } from './dto/update-collection-notice.dto';
import { collection_notice } from '@prisma/client';
@Injectable()
export class CollectionNoticeService {
    constructor(private prisma: PrismaService) { }

    async createCollectionNotice(noticeData: CreateCollectionNoticeDto): Promise<collection_notice> {
        return this.prisma.collection_notice.create({
            data: {
                collection_id: noticeData.collection_id,
                collection_record: noticeData.record,
                collection_notice: noticeData.remind,
                visit_date: noticeData.visitDate,
                notice_date: noticeData.remindDate,
                isDelete: false,
            },
        });
    }
    async deleteCollectionNotice(noticeId: number): Promise<void> {
        await this.prisma.collection_notice.delete({
            where: { notice_id: noticeId },
        });
    }

    async updateCollectionNotice(noticeId: number, updateData: UpdateCollectionNoticeDto): Promise<collection_notice> {
        return this.prisma.collection_notice.update({
            where: { notice_id: noticeId },
            data: {
                visit_date: updateData.visitDate,
                collection_record: updateData.record,
                notice_date: updateData.remindDate,
                collection_notice: updateData.remind,
            },
        });
    }

}
