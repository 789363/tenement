import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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
                tenement_status: t.tenement_product_type,
                tenement_type: t.tenement_type,

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
                tenement_status: t.tenement_product_type,
                tenement_type: t.tenement_type,

            }))
        };
    }

    async getAllTenementSells(isAdmin: boolean, userId: number): Promise<{ message: string; data: any[] }> {
        try {
            let queryOptions = {
                include: {
                    Tenement_Create: {
                        include: {
                            Tenement: true
                        }
                    }
                }
            };

            if (!isAdmin) {
                queryOptions['where'] = {
                    Tenement_Create: {
                        Tenement: {
                            owner: userId
                        }
                    }
                };
            }

            const tenementSells = await this.prisma.tenement_Sell.findMany(queryOptions);

            const data = tenementSells.map(sell => ({
                tenement_address: sell.Tenement_Create.Tenement.tenement_address,
                tenement_face: sell.Tenement_Create.Tenement.tenement_face,
                tenement_status: sell.Tenement_Create.Tenement.tenement_type,
                tenement_type: sell.Tenement_Create.Tenement.tenement_product_type,
                tenement_style: sell.Tenement_Create.Tenement.tenement_style,
                management_fee_bottom: sell.Tenement_Create.management_fee,
                management_floor_bottom: sell.Tenement_Create.tenement_floor,
                selling_price: sell.Tenement_Create.selling_price,
                Total_rating: sell.Tenement_Create.total_rating,
                inside_rating: sell.Tenement_Create.inside_rating,
                public_building: sell.Tenement_Create.public_buliding,
                tenement_floor: sell.Tenement_Create.tenement_floor
            }));

            return { message: "Successfully update the media", data };
        } catch (error) {
            throw new InternalServerErrorException('An error occurred while retrieving tenements sells.');
        }
    }

    async getAllTenementRents(isAdmin: boolean, userId: number): Promise<{ message: string; data: any[] }> {
        try {
            let queryOptions = {
                include: {
                    Tenement_Create: {
                        include: {
                            Tenement: true
                        }
                    }
                }
            };

            if (!isAdmin) {
                queryOptions['where'] = {
                    Tenement_Create: {
                        Tenement: {
                            owner: userId
                        }
                    }
                };
            }

            const tenementRents = await this.prisma.tenement_Rent.findMany(queryOptions);

            const data = tenementRents.map(rent => ({
                tenement_address: rent.Tenement_Create.Tenement.tenement_address,
                tenement_face: rent.Tenement_Create.Tenement.tenement_face,
                tenement_status: rent.Tenement_Create.Tenement.tenement_type, // 假设 tenement_status 存在于 Tenement 表中
                tenement_type: rent.Tenement_Create.Tenement.tenement_product_type, // 假设 tenement_type 存在于 Tenement 表中
                tenement_style: rent.Tenement_Create.Tenement.tenement_style,
                management_fee_bottom: rent.Tenement_Create.management_fee,
                management_floor_bottom: rent.Tenement_Create.tenement_floor,
                rent: rent.Tenement_Create.rent_price,
                Total_rating: rent.Tenement_Create.total_rating,
                inside_rating: rent.Tenement_Create.inside_rating,
                public_building: rent.Tenement_Create.public_buliding,
                tenement_floor: rent.Tenement_Create.tenement_floor

            }));

            return { message: "Successfully update the media", data };
        } catch (error) {
            throw new InternalServerErrorException('An error occurred while retrieving tenements rents.');
        }
    }

}
