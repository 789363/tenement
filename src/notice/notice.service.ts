import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCollectionNoticeDto, UpdateCollectionNoticeDto, CreateTenementNoticeDto, UpdateTenementNoticeDto, NoticeDto } from './dto/notice.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class NoticeService {
    constructor(private prisma: PrismaService) { }

    async getNoticeByIdAndType(id: number, type: string) {
        let notices;
        if (type === 'collection') {
            notices = await this.prisma.collection_Notice.findMany({
                where: {
                    collection_id: id,
                }
            });
        } else {
            notices = await this.prisma.tenement_Notice.findMany({
                where: {
                    tenement_id: id,
                },
            });
        }

        return notices.length > 0
            ? { message: "success", data: notices }
            : { message: "Notice not found" };
    }

    async createNotices(type: string, noticeDataArray: (CreateCollectionNoticeDto | CreateTenementNoticeDto)[], userId: number) {
        const createdNotices = await Promise.all(noticeDataArray.map(async noticeData => {
            const data = { ...noticeData, owner: userId }; // 添加 owner 字段
            if (type === 'collection') {
                return await this.prisma.collection_Notice.create({
                    data: data as CreateCollectionNoticeDto,
                });
            } else {
                return await this.prisma.tenement_Notice.create({
                    data: data as CreateTenementNoticeDto,
                });
            }
        }));

        return { message: "notices saved", data: createdNotices };
    }





    async updateNotices(type: string, noticeDataArray: CreateCollectionNoticeDto[] | UpdateCollectionNoticeDto[] | UpdateTenementNoticeDto[]) {
        try {
            await Promise.all(noticeDataArray.map(async noticeData => {
                if (type === 'collection') {
                    if (noticeData.isNew) {
                        delete noticeData.isNew; // 移除 isNew 字段
                        await this.prisma.collection_Notice.create({
                            data: noticeData as CreateCollectionNoticeDto
                        });
                    } else {
                        await this.prisma.collection_Notice.update({
                            where: { id: parseInt(noticeData.id) },
                            data: noticeData as UpdateCollectionNoticeDto,
                        });
                    }
                } else if (type === 'tenement') {

                    await this.prisma.tenement_Notice.update({
                        where: { id: parseInt(noticeData.id) },
                        data: noticeData as UpdateTenementNoticeDto,
                    });

                }
            }));
            return { message: "notices updated" };
        } catch (error) {
            throw new InternalServerErrorException('An error occurred while updating the notices.');
        }
    }

    async deleteNotice(id: number, type: string) {
        try {
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
        } catch (error) {
            // 捕獲 Prisma 抛出的特定錯誤，例如試圖刪除不存在的資源
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new NotFoundException(`Notice with ID ${id} not found`);
            }

            // 如果有其他未知錯誤，可以重新抛出或處理
            throw error;
        }
    }

}
