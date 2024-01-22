import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCollectionNoticeDto, UpdateCollectionNoticeDto, CreateTenementNoticeDto, UpdateTenementNoticeDto } from './dto/notice.dto';

@Injectable()
export class NoticeService {
    constructor(private prisma: PrismaService) { }

    async getNoticeByIdAndType(id: number, type: string) {
        let notice;
        if (type === 'collection') {
            notice = await this.prisma.collection_Notice.findUnique({
                where: { id },
            });
        } else {
            notice = await this.prisma.tenement_Notice.findUnique({
                where: { id },
            });
        }

        return notice ? { message: "success", data: [notice] } : { message: "Notice not found" };
    }

    async createNotice(type: string, noticeData: CreateCollectionNoticeDto | CreateTenementNoticeDto) {
        let newNotice;
        if (type === 'collection') {
            newNotice = await this.prisma.collection_Notice.create({
                data: noticeData as CreateCollectionNoticeDto,
            });
        } else {
            newNotice = await this.prisma.tenement_Notice.create({
                data: noticeData as CreateTenementNoticeDto,
            });
        }

        return { message: "notices saved", data: [newNotice] };
    }

    async updateNotice(id: number, type: string, noticeData: UpdateCollectionNoticeDto | UpdateTenementNoticeDto) {
        let updatedNotice;
        if (type === 'collection') {
            updatedNotice = await this.prisma.collection_Notice.update({
                where: { id },
                data: noticeData as UpdateCollectionNoticeDto,
            });
        } else {
            updatedNotice = await this.prisma.tenement_Notice.update({
                where: { id },
                data: noticeData as UpdateTenementNoticeDto,
            });
        }

        return { message: "notices updated", data: [updatedNotice] };
    }

    async deleteNotice(id: number, type: string) {
        if (type === 'collection') {
            await this.prisma.collection_Notice.delete({
                where: { id },
            });
        } else {
            await this.prisma.tenement_Notice.delete({
                where: { id },
            });
        }

        return { message: "notices deleted" };
    }
}
