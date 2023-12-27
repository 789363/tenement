import { Injectable } from '@nestjs/common';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CollectionService {
    constructor(private prisma: PrismaService) { }

    async createCollection(collectionData: CreateCollectionDto): Promise<any> {

        // 将字符串 "true" 和 "false" 转换为布尔值
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

    async updateCollection(collectionId: number, collectionData: UpdateCollectionDto): Promise<any> {
        return this.prisma.collection_info.update({
            where: { collection_id: collectionId },
            data: collectionData,
        });
    }


    async deleteCollection(collectionId: number, tenement_id: number): Promise<any> {
        return this.prisma.collection_info.update({
            where: { collection_id: collectionId, tenement_id: tenement_id },
            data: { isDelete: true },
        });
    }
}
