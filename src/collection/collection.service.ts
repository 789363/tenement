// src/collection/collection.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Collection } from '@prisma/client';
import { CreateCollectionDto, UpdateCollectionDto } from './dto/collection.dto';

@Injectable()
export class CollectionService {
    constructor(private prisma: PrismaService) { }

    async getCollectionById(id: number): Promise<Collection | null> {
        return this.prisma.collection.findUnique({
            where: { id },
        });
    }

    async getAllCollections(): Promise<Collection[]> {
        return this.prisma.collection.findMany();
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
