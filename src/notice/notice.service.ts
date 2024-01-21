import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { NoticeDto } from './dto/notice.dto';

@Injectable()
export class NoticeService {
    constructor(private prisma: PrismaService) { }

    async getNoticeByIdAndType(id: number, type: string) {
        const notice = await this.prisma.notice.findFirst({
            where: {
                id: id,
                type: type,
            },
        });

        return notice ? { message: "success", data: [notice] } : { message: "Notice not found" };
    }

    async createNotice(noticeData: NoticeDto) {
        const newNotice = await this.prisma.notice.create({
            data: noticeData,
        });

        return { message: "notices saved", data: [newNotice] };
    }

    async updateNotice(id: number, noticeData: NoticeDto) {
        const updatedNotice = await this.prisma.notice.update({
            where: { id },
            data: noticeData,
        });

        return { message: "notices updated", data: [updatedNotice] };
    }

    async deleteNotice(id: number) {
        const deletedNotice = await this.prisma.notice.delete({
            where: { id },
        });

        return { message: "notices deleted", data: [deletedNotice] };
    }
}
