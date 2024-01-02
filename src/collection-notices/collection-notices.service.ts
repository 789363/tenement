import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCollectionNoticeDto } from './dto/create-collection-notice.dto';
import { UpdateCollectionNoticeDto } from './dto/update-collection-notice.dto';
import { collection_notice } from '@prisma/client';
@Injectable()
export class CollectionNoticeService {
    constructor(private prisma: PrismaService) { }

    async createCollectionNotice(noticeData: CreateCollectionNoticeDto): Promise<collection_notice> {
        // 檢查 collection_id 是否為字符串，並將其轉換為數字
        console.log(noticeData)
        const collectionId = typeof noticeData.collection_id === 'string'
            ? parseInt(noticeData.collection_id, 10)
            : noticeData.collection_id;

        return this.prisma.collection_notice.create({
            data: {
                collection_id: collectionId,
                collection_record: noticeData.record,
                collection_notice: noticeData.remind,
                visit_date: noticeData.visitDate, // 確保這是一個合適的日期格式
                notice_date: noticeData.remindDate, // 確保這是一個合適的日期格式
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
