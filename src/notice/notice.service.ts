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
    const numericId = parseInt(id.toString(), 10);

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
      return this.createCollectionNotices(
        noticeDataArray as CreateCollectionNoticeDto[],
      );
    } else if (
      type === 'market' ||
      type === 'develop' ||
      type === 'sell' ||
      type === 'rent'
    ) {
      return this.createTenementNotices(
        noticeDataArray as CreateTenementNoticeDto[],
        userId,
        type,
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
              delete noticeData.isNew;
              await this.prisma.collection_Notice.create({
                data: noticeData as CreateCollectionNoticeDto,
              });
            } else {
              await this.prisma.collection_Notice.update({
                where: { id: parseInt(noticeData.id) },
                data: {
                  visitDate: noticeData.visitDate,
                  record: noticeData.record,
                  remindDate: noticeData.remindDate,
                  remind: noticeData.remind,
                },
              });
            }
          } else if (
            type === 'market' ||
            type === 'develop' ||
            type === 'sell' ||
            type === 'rent'
          ) {
            if (noticeData.isNew) {
              delete noticeData.isNew;
              await this.prisma.tenement_Notice.create({
                data: noticeData as CreateTenementNoticeDto,
              });
            } else {
              await this.prisma.tenement_Notice.update({
                where: { id: parseInt(noticeData.id) },
                data: {
                  visitDate: noticeData.visitDate,
                  record: noticeData.record,
                  remindDate: noticeData.remindDate,
                  remind: noticeData.remind,
                },
              });
            }
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
    const noticeId = parseInt(id.toString(), 10);
    try {
      if (type === 'collection') {
        await this.prisma.collection_Notice.delete({
          where: { id: noticeId },
        });
      } else {
        await this.prisma.tenement_Notice.delete({
          where: { id: noticeId },
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
    try {
      return Promise.all(
        noticeDataArray.map(async (noticeData) => {
          if ('isNew' in noticeData) {
            delete noticeData.isNew;
          }
          return await this.prisma.collection_Notice.create({
            data: {
              ...noticeData,
              collection_id: noticeData.collection_id,
            },
          });
        }),
      );
    } catch (error) {
      console.error(error);
    }
  }

  private async createTenementNotices(
    noticeDataArray: CreateTenementNoticeDto[],
    userId: number,
    type: string,
  ) {
    return Promise.all(
      noticeDataArray.map(async (noticeData) => {
        if ('isNew' in noticeData) {
          delete noticeData.isNew;
        }

        return await this.prisma.tenement_Notice.create({
          data: {
            ...noticeData,
            owner: userId,
            type: type,
          },
        });
      }),
    );
  }
}
