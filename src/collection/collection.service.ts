import { Injectable } from '@nestjs/common';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { GetCollectionsDto } from './dto/get-colletions.dto';
import { collection_info } from '@prisma/client';
@Injectable()
export class CollectionService {
    constructor(private prisma: PrismaService) { }
    private collections = [];
    async createCollection(collectionData: CreateCollectionDto): Promise<collection_info> {


        let isDelete: boolean | string;
        if (isDelete === 'true') {
            isDelete = true;
        } else if (isDelete === 'false') {
            isDelete = false;
        }
        return this.prisma.collection_info.create({
            data: {
                collection_name: collectionData.collection_name,
                price: collectionData.price,
                payment: collectionData.payment,
                collection_remark: collectionData.collection_remark,
                remittance_bank: collectionData.remittance_bank,
                remittance_account: collectionData.remittance_account,
                isDelete: collectionData.isDelete,
                tenement: {
                    connect: { tenement_id: parseInt(collectionData.tenement_id) },
                },
            },
        });
    }

    async updateCollection(collectionData: UpdateCollectionDto): Promise<collection_info> {
        return this.prisma.collection_info.update({
            where: { collection_id: collectionData.collection_id },
            data: {
                collection_name: collectionData.collection_name,
                price: collectionData.price,
                payment: collectionData.payment,
                collection_remark: collectionData.collection_remark,
                remittance_bank: collectionData.remittance_bank,
                remittance_account: collectionData.remittance_account,
            },
        });
    }


    async deleteCollection(collectionId: number, tenement_id: number): Promise<collection_info> {
        return this.prisma.collection_info.update({
            where: { collection_id: collectionId, tenement_id: tenement_id },
            data: { isDelete: true },
        });
    }

    async getCollections(): Promise<collection_info[]> {
        return this.prisma.collection_info.findMany({
            where: { isDelete: false },
        });
    }

    async getCollectionById(collectionId: number): Promise<collection_info> {
        const collection = this.collections.find(c => c.collection_id === collectionId);
        return collection || null; // 如果找不到，返回 null 或拋出異常
    }
}
