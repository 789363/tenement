import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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

    async getTenementSellById(tenementId: number, userId: number, isAdmin: boolean): Promise<{ message: string; data: any }> {
        const tenementSell = await this.prisma.tenement_Sell.findUnique({
            where: { tenement_id: tenementId },
            include: { Tenement_Create: { include: { Tenement: true } } }
        });

        if (!tenementSell) {
            throw new NotFoundException('Tenement sell not found.');
        }

        if (!isAdmin && tenementSell.Tenement_Create.Tenement.owner !== userId) {
            throw new ForbiddenException('Access to this tenement sell is forbidden.');
        }

        const data = {
            tenement_address: tenementSell.Tenement_Create.Tenement.tenement_address,
            tenement_product_type: tenementSell.Tenement_Create.Tenement.tenement_product_type,
            tenement_type: tenementSell.Tenement_Create.Tenement.tenement_type,
            tenement_status: tenementSell.Tenement_Create.Tenement.tenement_status,
            tenement_face: tenementSell.Tenement_Create.Tenement.tenement_face,
            tenement_images: tenementSell.Tenement_Create.Tenement.tenement_images,
            total_rating: tenementSell.Tenement_Create.total_rating,
            main_building: tenementSell.Tenement_Create.main_building,
            affiliated_building: tenementSell.Tenement_Create.affiliated_building,
            public_building: tenementSell.Tenement_Create.public_buliding,
            unregistered_area: tenementSell.Tenement_Create.unregistered_area,
            management_magnification: tenementSell.Tenement_Create.management_magnification,
            management_fee: tenementSell.Tenement_Create.management_fee,
            selling_price: tenementSell.Tenement_Create.selling_price,
            rent_price: tenementSell.Tenement_Create.rent_price,
            deposit_price: tenementSell.Tenement_Create.deposit_price,
            tenement_floor: tenementSell.Tenement_Create.tenement_floor,
            tenement_host_name: tenementSell.Tenement_Create.tenement_host_name,
            tenement_host_telphone: tenementSell.Tenement_Create.tenement_host_telphone,
            tenement_host_phone: tenementSell.Tenement_Create.tenement_host_phone,
            tenement_host_line: tenementSell.Tenement_Create.tenement_host_line,
            tenement_host_remittance_bank: tenementSell.Tenement_Create.tenement_host_remittance_bank,
            tenement_host_remittance_account: tenementSell.Tenement_Create.tenement_host_remittance_account,
            tenement_host_address: tenementSell.Tenement_Create.tenement_host_address,
            tenement_host_birthday: tenementSell.Tenement_Create.tenement_host_birthday,
            tenement_host_hobby: tenementSell.Tenement_Create.tenement_host_hobby,
            tenement_host_remark: tenementSell.Tenement_Create.tenement_host_remark,
            buyer_order_date: tenementSell.buyer_order_date,
            buyer_handout_date: tenementSell.buyer_handout_date,
            buyer_name: tenementSell.buyer_name,
            buyer_id_images: tenementSell.buyer_id_images,
            buyer_phone: tenementSell.buyer_phone,
            buyer_jobtitle: tenementSell.buyer_jobtitle,
            buyer_remark: tenementSell.buyer_remark
        };

        return { message: "Successfully update the media", data };
    }

}
