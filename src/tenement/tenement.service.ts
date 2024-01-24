import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class TenementService {
    constructor(private prisma: PrismaService) { }

    // 获取所有物业信息
    async getAllTenements(): Promise<{ message: string; data: any[] }> {
        const tenements = await this.prisma.tenement.findMany();
        if (!tenements || tenements.length === 0) {
            throw new NotFoundException('Tenements not found.');
        }
        return {
            message: "Successfully get the tenements",
            data: tenements.map(t => ({
                tenement_address: t.tenement_address,
                tenement_face: t.tenement_face,
                tenement_status: t.tenement_status,
                tenement_type: t.tenement_type,
                // ...其他字段
            }))
        };
    }

    // 根据用户 ID 获取物业信息
    async getTenementsByUserId(userId: number): Promise<{ message: string; data: any[] }> {
        const tenements = await this.prisma.tenement.findMany({
            where: { owner: userId }
        });
        if (!tenements || tenements.length === 0) {
            throw new NotFoundException('Tenements not found.');
        }
        return {
            message: "Successfully get the tenements",
            data: tenements.map(t => ({
                tenement_address: t.tenement_address,
                tenement_face: t.tenement_face,
                tenement_status: t.tenement_status,
                tenement_type: t.tenement_type,
                // ...其他字段
            }))
        };
    }

    // 获取物业信息，根据类型和查询参数
    async getTenementsByTypeAndUser(type: string, queryParams: any, user: User) {
        if (user.isAdmin === true) {
            return this.getTenementsByType(type, queryParams);
        } else {
            queryParams.user = user.user_id; // 假设物业与用户 tenement_id 有关联
            return this.getTenementsByType(type, queryParams);
        }
    }

    // 私有方法：根据类型获取物业信息
    private async getTenementsByType(type: string, queryParams: any) {
        switch (type) {
            case 'rent':
                return this.getTenementsWithRent(queryParams);
            case 'sell':
                return this.getTenementsWithSell(queryParams);
            case 'develop':
                return this.getTenementsWithDevelop(queryParams);
            case 'market':
                return this.getTenementsWithMarket(queryParams);
            default:
                return [];
        }
    }

    // 创建物业信息
    async createTenement(type: string, data: any) {
        switch (type) {
            case 'rent':
                return this.prisma.tenement_Rent.create({ data });
            case 'sell':
                return this.prisma.tenement_Sell.create({ data });
            case 'develop':
                return this.prisma.tenement_Develop.create({ data });
            case 'market':
                return this.prisma.tenement_Market.create({ data });
            default:
                return null;
        }
    }

    // 更新物业信息
    async updateTenement(type: string, tenement_id: number, data: any) {
        switch (type) {
            case 'rent':
                return this.prisma.tenement_Rent.update({
                    where: { tenement_id },
                    data,
                });
            case 'sell':
                return this.prisma.tenement_Sell.update({
                    where: { tenement_id },
                    data,
                });
            case 'develop':
                return this.prisma.tenement_Develop.update({
                    where: { tenement_id },
                    data,
                });
            case 'market':
                return this.prisma.tenement_Market.update({
                    where: { tenement_id },
                    data,
                });
            default:
                return null;
        }
    }

    // 删除物业信息
    async deleteTenement(type: string, tenement_id: number) {
        switch (type) {
            case 'rent':
                return this.prisma.tenement_Rent.delete({ where: { tenement_id } });
            case 'sell':
                return this.prisma.tenement_Sell.delete({ where: { tenement_id } });
            case 'develop':
                return this.prisma.tenement_Develop.delete({ where: { tenement_id } });
            case 'market':
                return this.prisma.tenement_Market.delete({ where: { tenement_id } });
            default:
                return null;
        }
    }

    // 私有方法：获取出租物业信息
    private async getTenementsWithRent(queryParams: any) {
        // 构建查询条件...
        return this.prisma.tenement_Rent.findMany({ /* ... */ });
    }

    // 私有方法：获取出售物业信息
    private async getTenementsWithSell(queryParams: any) {
        // 构建查询条件...
        return this.prisma.tenement_Sell.findMany({ /* ... */ });
    }

    // 私有方法：获取开发追踪物业信息
    private async getTenementsWithDevelop(queryParams: any) {
        // 构建查询条件...
        return this.prisma.tenement_Develop.findMany({ /* ... */ });
    }

    // 私有方法：获取行销追踪物业信息
    private async getTenementsWithMarket(queryParams: any) {
        // 构建查询条件...
        return this.prisma.tenement_Market.findMany({ /* ... */ });
    }

    // 其他类型的私有方法...
}
