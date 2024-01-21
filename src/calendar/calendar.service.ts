import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CalendarService {
    constructor(private prisma: PrismaService) { }

    async getCalendarEvents(year: number, month: number) {
        const yearStr = year.toString();
        const monthStr = month.toString().padStart(2, '0');

        const notices = await this.prisma.tenement_Notice.findMany({
            where: {
                visitDate: {
                    startsWith: `${yearStr}-${monthStr}`,
                },
            },
            // 可能需要其他查询参数，如排序
        });

        const formattedEvents = this.formatEvents(notices);
        return {
            message: "Successfully retrieved the events",
            data: formattedEvents,
        };
    }

    private formatEvents(notices: any[]): any[] {
        return notices.map(notice => {
            const date = new Date(notice.visitDate);
            return {
                day: date.getDate(),
                events: [
                    {
                        content: notice.record,
                        id: notice.id.toString(),
                        class: notice.type,
                    },
                ],
            };
        });
    }

    async getCollectionNotices(year: number, month: number) {
        const yearStr = year.toString();
        const monthStr = month.toString().padStart(2, '0');

        const collectionNotices = await this.prisma.collection_Notice.findMany({
            where: {
                visitDate: {
                    startsWith: `${yearStr}-${monthStr}`,
                },
            },
            // 可能需要其他查询参数，如排序
        });

        const formattedNotices = this.formatCollectionNotices(collectionNotices);
        return {
            message: "Successfully retrieved the collection notices",
            data: formattedNotices,
        };
    }

    private formatCollectionNotices(notices: any[]): any[] {
        return notices.map(notice => {
            const date = new Date(notice.visitDate);
            return {
                day: date.getDate(),
                events: [
                    {
                        content: notice.record,
                        id: notice.id.toString(),
                        class: 'collection-notice', // 或者根据您的业务需求来设置
                    },
                ],
            };
        });
    }

}
