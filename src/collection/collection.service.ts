// src/collection/collection.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Collection } from '@prisma/client';
import { CreateCollectionDto, UpdateCollectionDto, CollectionDto } from './dto/collection.dto';

@Injectable()
export class CollectionService {
    constructor(private prisma: PrismaService) { }

    async getCollectionById(id: number): Promise<Collection | null> {
        return this.prisma.collection.findUnique({
            where: { id },
        });
    }

    async getCollectionByIdAndUserId(id: number, userId: number): Promise<Collection | null> {
        return this.prisma.collection.findFirst({
            where: {
                id,
                owner: userId // 假设收藏信息中有一个字段是 owner，表示收藏的拥有者
            },
        });
    }

    async getAllCollections(): Promise<{ message: string; data: CollectionDto[] }> {
        try {
            const collections = await this.prisma.collection.findMany();
            const data = collections.map(collection => ({
                collection_name: collection.collection_name,
                tenement_address: collection.tenement_no,
                collection_type: collection.collection_type,
                price: collection.price,
                collection_id: collection.id
                // 可以根据需要添加其他字段
            }));
            return { message: "Successfully get the media", data };
        } catch (error) {
            throw new InternalServerErrorException('An error occurred while retrieving collections.');
        }
    }

    async getCollectionsByUserId(userId: number): Promise<{ message: string; data: CollectionDto[] }> {
        try {
            const collections = await this.prisma.collection.findMany({
                where: {
                    owner: userId,
                    is_deleted: false // 仅返回未被删除的记录
                }
            });
            const data = collections.map(collection => ({
                collection_name: collection.collection_name,
                tenement_address: collection.tenement_no,
                collection_type: collection.collection_type,
                price: collection.price,
                collection_id: collection.id
                // 可以根据需要添加其他字段
            }));
            return { message: "Successfully get the media", data };
        } catch (error) {
            throw new InternalServerErrorException('An error occurred while retrieving user-specific collections.');
        }
    }



    async createCollection(collectionData: CreateCollectionDto): Promise<{ message: string }> {
        await this.prisma.collection.create({
            data: collectionData,
        });
        return { message: "Successfully add the media" };
    }


    async updateCollection(id: number, collectionData: UpdateCollectionDto): Promise<Collection> {
        return this.prisma.collection.update({
            where: { id },
            data: collectionData,
        });
    }

    async deleteCollection(id: number): Promise<Collection> {
        return this.prisma.collection.delete({
            where: { id },
        });
    }
}
