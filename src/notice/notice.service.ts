import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  CreateCollectionNoticeDto,
  UpdateCollectionNoticeDto,
  CreateTenementNoticeDto,
  UpdateTenementNoticeDto,
} from './dto/notice.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class NoticeService {
  constructor(private prisma: PrismaService) {}

  async getNoticeByIdAndType(id: number, type: string) {
    let notices;
    const numericId = parseInt(id.toString(), 10); // 将字符串转换为数字，并进行类型断言

    if (type === 'collection') {
      notices = await this.prisma.collection_Notice.findMany({
        where: {
          collection_id: numericId,
        },
      });
    } else {
      notices = await this.prisma.tenement_Notice.findMany({
        where: {
          tenement_id: numericId,
        },
      });
    }

    return notices.length > 0
      ? { message: 'success', data: notices }
      : { message: 'Notice not found' };
  }

  async createNotices(
    type: string,
    noticeDataArray: CreateCollectionNoticeDto[] | CreateTenementNoticeDto[],
    userId: number,
  ) {
    if (type === 'collection') {
      // 处理创建 Collection_Notice
      return this.createCollectionNotices(
        noticeDataArray as CreateCollectionNoticeDto[],
      );
    } else if (type === 'tenement') {
      // 处理创建 Tenement_Notice
      return this.createTenementNotices(
        noticeDataArray as CreateTenementNoticeDto[],
        userId,
      );
    } else {
      throw new BadRequestException('Unsupported notice type');
    }
  }

  async updateNotices(
    type: string,
    noticeDataArray:
      | CreateCollectionNoticeDto[]
      | UpdateCollectionNoticeDto[]
      | UpdateTenementNoticeDto[],
  ) {
    try {
      await Promise.all(
        noticeDataArray.map(async (noticeData) => {
          if (type === 'collection') {
            if (noticeData.isNew) {
              delete noticeData.isNew; // 移除 isNew 字段
              await this.prisma.collection_Notice.create({
                data: noticeData as CreateCollectionNoticeDto,
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
        }),
      );
      return { message: 'notices updated' };
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while updating the notices.',
      );
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

      return { message: 'notices deleted' };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Notice with ID ${id} not found`);
      }

      throw error;
    }
  }

  private async createCollectionNotices(
    noticeDataArray: CreateCollectionNoticeDto[],
  ) {
    return Promise.all(
      noticeDataArray.map(async (noticeData) => {
        return await this.prisma.collection_Notice.create({
          data: {
            ...noticeData,
            collection_id: noticeData.collection_id, // 直接使用 collection_id，无需转换
          },
        });
      }),
    );
  }

  private async createTenementNotices(
    noticeDataArray: CreateTenementNoticeDto[],
    userId: number,
  ) {
    return Promise.all(
      noticeDataArray.map(async (noticeData) => {
        return await this.prisma.tenement_Notice.create({
          data: {
            ...noticeData,
            owner: userId, // 设置通知的所有者
          },
        });
      }),
    );
  }
}
