import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Tenement } from '@prisma/client';
import { CreateTenementDto, UpdateTenementDto } from './dto/tenement.dto';

@Injectable()
export class TenementService {
    constructor(private prisma: PrismaService) { }

    async getAllTenements(): Promise<Tenement[]> {
        return this.prisma.tenement.findMany();
    }

    async getTenementById(id: number): Promise<Tenement | null> {
        return this.prisma.tenement.findUnique({
            where: { id },
        });
    }

    async createTenement(tenementData: CreateTenementDto): Promise<Tenement> {
        return this.prisma.tenement.create({
            data: tenementData,
        });
    }

    async updateTenement(id: number, tenementData: UpdateTenementDto): Promise<Tenement> {
        return this.prisma.tenement.update({
            where: { id },
            data: tenementData,
        });
    }

    async deleteTenement(id: number): Promise<Tenement> {
        return this.prisma.tenement.delete({
            where: { id },
        });
    }
}
