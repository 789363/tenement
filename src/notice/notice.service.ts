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
    if (type === 'collection') {
      notices = await this.prisma.collection_Notice.findMany({
        where: {
          collection_id: id,
        },
      });
    } else {
      notices = await this.prisma.tenement_Notice.findMany({
        where: {
          tenement_id: id,
        },
      });
    }

    return notices.length > 0
      ? { message: 'success', data: notices }
      : { message: 'Notice not found' };
  }

  async createNotices(
    type: string,
    noticeDataArray: Array<CreateCollectionNoticeDto | CreateTenementNoticeDto>,
    userId: number,
  ) {
    // 检查 noticeDataArray 是否为数组
    if (!Array.isArray(noticeDataArray)) {
      throw new BadRequestException('noticeDataArray must be an array');
    }

    const createdNotices = await Promise.all(
      noticeDataArray.map(async (noticeData) => {
        if (type === 'collection') {
          if (!(noticeData instanceof CreateCollectionNoticeDto)) {
            throw new BadRequestException(
              'Invalid data type for collection notice',
            );
          }
          return await this.prisma.collection_Notice.create({
            data: {
              ...noticeData,
            },
          });
        } else if (type === 'tenement') {
          if (!(noticeData instanceof CreateTenementNoticeDto)) {
            throw new BadRequestException(
              'Invalid data type for tenement notice',
            );
          }
          return await this.prisma.tenement_Notice.create({
            data: {
              ...noticeData,
              owner: userId,
            },
          });
        } else {
          throw new BadRequestException('Unsupported notice type');
        }
      }),
    );

    return { message: 'notices saved', data: createdNotices };
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
}
