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
        const collectionId = typeof noticeData.collection_id === 'string'
            ? parseInt(noticeData.collection_id, 10)
            : noticeData.collection_id;

        return this.prisma.collection_notice.create({
            data: {
                collection_id: collectionId,
                collection_record: noticeData.collection_record,
                collection_remind: noticeData.collection_remind,
                visitDate: noticeData.visitDate, // 確保這是一個合適的日期格式
                remindDate: noticeData.remindDate, // 確保這是一個合適的日期格式
            },
        });
    }
    async deleteCollectionNotice(notice_id: number): Promise<void> {
        const noticeId = typeof notice_id === 'string'
            ? parseInt(notice_id, 10)
            : notice_id;
        await this.prisma.collection_notice.delete({
            where: { notice_id: noticeId },
        });
    }

    async updateCollectionNotice(notice_id: number, updateData: UpdateCollectionNoticeDto): Promise<collection_notice> {
        const noticeId = typeof notice_id === 'string'
            ? parseInt(notice_id, 10)
            : notice_id;
        return this.prisma.collection_notice.update({
            where: { notice_id: noticeId },
            data: {
                visitDate: updateData.visitDate,
                collection_record: updateData.collection_record,
                remindDate: updateData.remindDate,
                collection_remind: updateData.collection_remind,
            },
        });
    }

}
