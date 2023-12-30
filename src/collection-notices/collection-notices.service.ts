import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCollectionNoticeDto } from './dto/create-collection-notice.dto';

@Injectable()
export class CollectionNoticeService {
    constructor(private prisma: PrismaService) { }

    async createCollectionNotice(noticeData: CreateCollectionNoticeDto): Promise<any> {
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


}
