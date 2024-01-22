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
        });

        return {
            message: "Successfully retrieved the events",
            data: this.formatEvents(notices),
        };
    }

    async getUserCalendarEvents(year: number, month: number, userId: number) {
        const yearStr = year.toString();
        const monthStr = month.toString().padStart(2, '0');

        const notices = await this.prisma.tenement_Notice.findMany({
            where: {
                visitDate: {
                    startsWith: `${yearStr}-${monthStr}`,
                },
                owner: userId,
            },
        });

        return {
            message: "Successfully retrieved user-specific events",
            data: this.formatEvents(notices),
        };
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
        });

        return {
            message: "Successfully retrieved the collection notices",
            data: this.formatCollectionNotices(collectionNotices),
        };
    }

    async getUserCollectionNotices(year: number, month: number, userId: number) {
        const yearStr = year.toString();
        const monthStr = month.toString().padStart(2, '0');

        const collectionNotices = await this.prisma.collection_Notice.findMany({
            where: {
                visitDate: {
                    startsWith: `${yearStr}-${monthStr}`,
                },
                Collection: {
                    owner: userId,
                },
            },
        });

        return {
            message: "Successfully retrieved user-specific collection notices",
            data: this.formatCollectionNotices(collectionNotices),
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

    private formatCollectionNotices(notices: any[]): any[] {
        return notices.map(notice => {
            const date = new Date(notice.visitDate);
            return {
                day: date.getDate(),
                events: [
                    {
                        content: notice.record,
                        id: notice.id.toString(),
                        class: 'collection-notice',
                    },
                ],
            };
        });
    }
}
