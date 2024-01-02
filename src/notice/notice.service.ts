import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class NoticesService {
    constructor(private prisma: PrismaService) { }

    async getNotices(year: string, month: string): Promise<any> {
        // 将年份和月份字符串转换为数字
        const yearNum = parseInt(year);
        const monthNum = parseInt(month);

        // 使用转换后的数字构造日期
        const startDate = new Date(yearNum, monthNum - 1, 1);
        const endDate = new Date(yearNum, monthNum, 0);

        // 并行查询五个表
        const [rentNotices, sellNotices, developNotices, marketNotices, collectionNotices] = await Promise.all([
            this.prisma.rent_notice.findMany({
                where: { visit_date: { gte: startDate, lte: endDate } },
                select: { notice_id: true, rent_record: true, visit_date: true }
            }),
            this.prisma.sell_notice.findMany({
                where: { visit_date: { gte: startDate, lte: endDate } },
                select: { notice_id: true, sell_record: true, visit_date: true }
            }),
            this.prisma.develop_notice.findMany({
                where: { visit_date: { gte: startDate, lte: endDate } },
                select: { notice_id: true, develop_record: true, visit_date: true }
            }),
            this.prisma.market_notice.findMany({
                where: { visit_date: { gte: startDate, lte: endDate } },
                select: { notice_id: true, market_hint: true, visit_date: true }
            }),
            this.prisma.collection_notice.findMany({
                where: { visit_date: { gte: startDate, lte: endDate } },
                select: { notice_id: true, collection_record: true, visit_date: true }
            })
        ]);


        // 格式化数据以符合响应结构
        const allNotices = [
            ...rentNotices.map(notice => ({ ...notice, type: 'rent' })),
            ...sellNotices.map(notice => ({ ...notice, type: 'sell' })),
            ...developNotices.map(notice => ({ ...notice, type: 'develop' })),
            ...marketNotices.map(notice => ({ ...notice, type: 'market' })),
            ...collectionNotices.map(notice => ({ ...notice, type: 'collection' }))
        ];
        // 格式化数据以符合响应结构
        const formattedData = allNotices.reduce((acc, notice) => {
            const day = notice.visit_date.getDate();
            if (!acc[day]) {
                acc[day] = { day, events: [] };
            }
            const event = {
                id: notice.notice_id,
                content: '',
                class: notice.type
            };

            if (notice.type === 'rent' && 'rent_record' in notice) {
                event.content = notice.rent_record;
            } else if (notice.type === 'sell' && 'sell_record' in notice) {
                event.content = notice.sell_record;
            } else if (notice.type === 'develop' && 'develop_record' in notice) {
                event.content = notice.develop_record;
            } else if (notice.type === 'market' && 'market_hint' in notice) {
                event.content = notice.market_hint; // 或其他适当的字段
            } else if (notice.type === 'collection' && 'collection_record' in notice) {
                event.content = notice.collection_record;
            }

            acc[day].events.push(event);
            return acc;
        }, {});


        return Object.values(formattedData);
    }
}
