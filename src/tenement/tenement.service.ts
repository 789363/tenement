import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Tenement } from '@prisma/client';

@Injectable()
export class TenementService {
    constructor(private prisma: PrismaService) { }

    async getAllTenements(): Promise<Tenement[]> {
        // 返回所有物业信息
        return this.prisma.tenement.findMany();
    }

    async getTenementById(id: number): Promise<Tenement | null> {
        // 根据 ID 返回特定物业信息
        return this.prisma.tenement.findUnique({
            where: { id },
        });
    }

    async createTenement(tenementData: any): Promise<Tenement> {
        // 创建新的物业信息
        return this.prisma.tenement.create({
            data: tenementData,
        });
    }

    async updateTenement(id: number, tenementData: any): Promise<Tenement> {
        // 更新物业信息
        return this.prisma.tenement.update({
            where: { id },
            data: tenementData,
        });
    }

    async deleteTenement(id: number): Promise<Tenement> {
        // 删除物业信息
        return this.prisma.tenement.delete({
            where: { id },
        });
    }
}
