/* eslint-disable prettier/prettier */
import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTenementRentDto } from './dto/create-rent.dto';
import { CreateTenementSellDto } from './dto/create-sell.dto';
import { CreateTenementDevelopDto } from './dto/create-develop.dto';
import { CreateTenementMarketDto } from './dto/create-market.dto';
import { UpdateTenementSellDto } from './dto/update-sell.dto';
import { UpdateTenementRentDto } from './dto/update-rent.dtp';
import { UpdateTenementDevelopDto } from './dto/update-develop.dto';
import { UpdateTenementMarketDto } from './dto/update-market.dto';
import { GetTenementsFilterDto } from './dto/get-tenements-filter.dto';
import { GetTenementSellsFilterDto } from './dto/get-sells-fillter.dto';
import { TenementRentQueryDto } from './dto/get-rents-fillter.dto';
import { WhereClause } from './interface/tenement.interface';
@Injectable()
export class TenementService {
  constructor(private prisma: PrismaService) {}

  async getAllTenements(): Promise<{ message: string; data: any[] }> {
    const tenements = await this.prisma.tenement.findMany();

    type TenementWithFeeAndFloor = {
      tenement_id: number;
      tenement_address: string;
      tenement_face: string;
      tenement_product_type: string;
      tenement_type: string;
      management_fee: number;
      tenement_floor: number;
    };

    const tenementWithFeeAndFloor = (
      await Promise.all(
        tenements.map(async (cur) => {
          const tenementCreate = await this.prisma.tenement_Create.findUnique({
            where: { tenement_id: cur.id },
          });

          if (!tenementCreate) {
            const marketTenement = await this.prisma.tenement_Market.findUnique({
              where: { tenement_id: cur.id },
            });

            if (!marketTenement) return

            return {
              tenement_id: cur.id,
              tenement_address: cur.tenement_address,
              tenement_face: cur.tenement_face,
              tenement_product_type: cur.tenement_product_type,
              tenement_type: cur.tenement_type,
              management_fee: marketTenement.burget_rent_min,
              tenement_floor: marketTenement.hopefloor_min,
            }
          }

          return {
            tenement_id: cur.id,
            tenement_address: cur.tenement_address,
            tenement_face: cur.tenement_face,
            tenement_product_type: cur.tenement_product_type,
            tenement_type: cur.tenement_type,
            management_fee: tenementCreate.management_fee,
            tenement_floor: tenementCreate.tenement_floor,
          };
        }),
      )
    )
      // filter out null values
      .filter(Boolean) as TenementWithFeeAndFloor[];

    return {
      message: 'Successfully get the tenements',
      data: tenementWithFeeAndFloor.map((t) => ({
        tenement_id: t.tenement_id,
        tenement_address: t.tenement_address,
        tenement_face: t.tenement_face,
        tenement_status: t.tenement_product_type,
        tenement_type: t.tenement_type,
        tenement_product_type: t.tenement_product_type,
        management_fee_bottom: t.management_fee,
        management_floor_bottom: t.tenement_floor,
      })),
    };
  }

  async getTenementsByUserId(
    userId: number,
  ): Promise<{ message: string; data: any[] }> {
    const tenements = await this.prisma.tenement.findMany({
      where: { owner: userId, is_deleted: false },
    });
    if (!tenements || tenements.length === 0) {
      throw new NotFoundException('Tenements not found.');
    }
    return {
      message: 'Successfully get the tenements',
      data: tenements.map((t) => ({
        tenement_address: t.tenement_address,
        tenement_face: t.tenement_face,
        tenement_status: t.tenement_product_type,
        tenement_type: t.tenement_type,
      })),
    };
  }

  async getAllTenementSells(
    isadmin: boolean,
    userId: number,
  ): Promise<{ message: string; data: any[] }> {
    try {
      const queryOptions = {
        include: {
          Tenement_Create: {
            include: {
              Tenement: true,
            },
          },
        },
      };

      if (!isadmin) {
        queryOptions['where'] = {
          Tenement_Create: {
            Tenement: {
              owner: userId,
              is_deleted: false,
            },
          },
        };
      }

      const tenementSells =
        await this.prisma.tenement_Sell.findMany(queryOptions);

      const data = tenementSells.map((sell) => ({
        tenement_id: sell.tenement_id,
        tenement_address: sell.Tenement_Create.Tenement.tenement_address,
        tenement_face: sell.Tenement_Create.Tenement.tenement_face,
        tenement_status: sell.Tenement_Create.Tenement.tenement_type,
        tenement_type: sell.Tenement_Create.Tenement.tenement_product_type,
        tenement_product_type:
          sell.Tenement_Create.Tenement.tenement_product_type,
        management_fee_bottom: sell.Tenement_Create.management_fee,
        management_floor_bottom: sell.Tenement_Create.tenement_floor,
        selling_price: sell.Tenement_Create.selling_price,
        Total_rating: sell.Tenement_Create.total_rating,
        inside_rating: sell.Tenement_Create.inside_rating,
        public_building: sell.Tenement_Create.public_building,
        tenement_floor: sell.Tenement_Create.tenement_floor,
      }));

      return { message: 'Successfully update the media', data };
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while retrieving tenements sells.',
      );
    }
  }

  async getAllTenementRents(
    isadmin: boolean,
    userId: number,
  ): Promise<{ message: string; data: any[] }> {
    try {
      const queryOptions = {
        include: {
          Tenement_Create: {
            include: {
              Tenement: true,
            },
          },
        },
      };

      if (!isadmin) {
        queryOptions['where'] = {
          Tenement_Create: {
            Tenement: {
              owner: userId,
              is_deleted: false,
            },
          },
        };
      }

      const tenementRents =
        await this.prisma.tenement_Rent.findMany(queryOptions);

      const data = tenementRents.map((rent) => ({
        tenement_id: rent.tenement_id,
        tenement_product_type: rent.Tenement_Create.Tenement.tenement_product_type,
        tenement_address: rent.Tenement_Create.Tenement.tenement_address,
        tenement_face: rent.Tenement_Create.Tenement.tenement_face,
        tenement_status: rent.Tenement_Create.Tenement.tenement_type, // 假设 tenement_status 存在于 Tenement 表中
        tenement_type: rent.Tenement_Create.Tenement.tenement_product_type, // 假设 tenement_type 存在于 Tenement 表中
        management_fee_bottom: rent.Tenement_Create.management_fee,
        management_floor_bottom: rent.Tenement_Create.tenement_floor,
        rent: rent.Tenement_Create.rent_price,
        Total_rating: rent.Tenement_Create.total_rating,
        inside_rating: rent.Tenement_Create.inside_rating,
        public_building: rent.Tenement_Create.public_building,
        tenement_floor: rent.Tenement_Create.tenement_floor,
      }));

      return { message: 'Successfully update the media', data };
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while retrieving tenements rents.',
      );
    }
  }

  async getTenementSellById(
    tenementId: number,
    userId: number,
    isAdmin: boolean,
  ): Promise<{ message: string; data: any }> {
    const tenementSell = await this.prisma.tenement_Sell.findUnique({
      where: { tenement_id: tenementId, is_deleted: false },
      include: { Tenement_Create: { include: { Tenement: true } } },
    });

    if (!tenementSell) {
      throw new NotFoundException('Tenement sell not found.');
    }

    if (!isAdmin && tenementSell.Tenement_Create.Tenement.owner !== userId) {
      throw new ForbiddenException(
        'Access to this tenement sell is forbidden.',
      );
    }
    const buyerIdImagesArray = tenementSell.buyer_id_images && tenementSell.buyer_id_images.trim() !== ''
    ? tenementSell.buyer_id_images.split(',')
    : [];
  
  const tenementImagesArray = tenementSell.Tenement_Create.Tenement.tenement_images && tenementSell.Tenement_Create.Tenement.tenement_images.trim() !== ''
    ? tenementSell.Tenement_Create.Tenement.tenement_images.split(',')
    : [];
    const data = {
      tenement_id: tenementSell.tenement_id,
      tenement_address: tenementSell.Tenement_Create.Tenement.tenement_address,
      tenement_product_type:
        tenementSell.Tenement_Create.Tenement.tenement_product_type,
      tenement_type: tenementSell.Tenement_Create.Tenement.tenement_type,
      tenement_status: tenementSell.Tenement_Create.Tenement.tenement_status,
      tenement_face: tenementSell.Tenement_Create.Tenement.tenement_face,
      tenement_images: tenementImagesArray,
      total_rating: tenementSell.Tenement_Create.total_rating,
      main_building: tenementSell.Tenement_Create.main_building,
      affiliated_building: tenementSell.Tenement_Create.affiliated_building,
      public_building: tenementSell.Tenement_Create.public_building,
      unregistered_area: tenementSell.Tenement_Create.unregistered_area,
      management_magnification:
        tenementSell.Tenement_Create.management_magnification,
      management_fee: tenementSell.Tenement_Create.management_fee,
      selling_price: tenementSell.Tenement_Create.selling_price,
      rent_price: tenementSell.Tenement_Create.rent_price,
      deposit_price: tenementSell.Tenement_Create.deposit_price,
      tenement_floor: tenementSell.Tenement_Create.tenement_floor,
      tenement_host_name: tenementSell.Tenement_Create.tenement_host_name,
      tenement_host_telphone:
        tenementSell.Tenement_Create.tenement_host_telphone,
      tenement_host_phone: tenementSell.Tenement_Create.tenement_host_phone,
      tenement_host_line: tenementSell.Tenement_Create.tenement_host_line,
      tenement_host_remittance_bank:
        tenementSell.Tenement_Create.tenement_host_remittance_bank,
      tenement_host_remittance_account:
        tenementSell.Tenement_Create.tenement_host_remittance_account,
      tenement_host_address: tenementSell.Tenement_Create.tenement_host_address,
      tenement_host_birthday:
        tenementSell.Tenement_Create.tenement_host_birthday,
      tenement_host_hobby: tenementSell.Tenement_Create.tenement_host_hobby,
      tenement_host_remark: tenementSell.Tenement_Create.tenement_host_remark,
      buyer_order_date: tenementSell.buyer_order_date,
      buyer_handout_date: tenementSell.buyer_handout_date,
      buyer_name: tenementSell.buyer_name,
      buyer_id_images: buyerIdImagesArray,
      buyer_phone: tenementSell.buyer_phone,
      buyer_jobtitle: tenementSell.buyer_jobtitle,
      buyer_remark: tenementSell.buyer_remark,
    };

    return { message: 'Successfully update the media', data };
  }
  async getTenementRentById(
    tenementId: number,
    userId: number,
    isAdmin: boolean,
  ): Promise<{ message: string; data: any }> {
    const tenementRent = await this.prisma.tenement_Rent.findUnique({
      where: { tenement_id: tenementId },
      include: {
        Tenement_Create: {
          include: {
            Tenement: true,
          },
        },
      },
    });

    if (!tenementRent) {
      throw new NotFoundException('Tenement rent not found.');
    }

    if (!isAdmin && tenementRent.Tenement_Create.Tenement.owner !== userId) {
      throw new ForbiddenException(
        'Access to this tenement rent is forbidden.',
      );
    }
    // 进行字符串到数组的转换
    const tenementImagesArray = tenementRent.Tenement_Create.Tenement.tenement_images
    ? tenementRent.Tenement_Create.Tenement.tenement_images.split(',').filter(img => img.trim() !== '')
    : [];
  
  const renterIdImagesArray = tenementRent.renter_id_images
    ? tenementRent.renter_id_images.split(',').filter(idImg => idImg.trim() !== '')
    : [];
    const data = {
      tenement_id: tenementRent.Tenement_Create.Tenement.id,
      tenement_address: tenementRent.Tenement_Create.Tenement.tenement_address,
      tenement_product_type:
        tenementRent.Tenement_Create.Tenement.tenement_product_type,
      tenement_type: tenementRent.Tenement_Create.Tenement.tenement_type,
      tenement_face: tenementRent.Tenement_Create.Tenement.tenement_face,
      tenement_images: tenementImagesArray,
      tenement_status: tenementRent.Tenement_Create.Tenement.tenement_status,
      total_rating: tenementRent.Tenement_Create.total_rating,
      main_building: tenementRent.Tenement_Create.main_building,
      affiliated_building: tenementRent.Tenement_Create.affiliated_building,
      public_building: tenementRent.Tenement_Create.public_building,
      unregistered_area: tenementRent.Tenement_Create.unregistered_area,
      management_magnification:
        tenementRent.Tenement_Create.management_magnification,
      management_fee: tenementRent.Tenement_Create.management_fee,
      rent_price: tenementRent.Tenement_Create.rent_price,
      deposit_price: tenementRent.Tenement_Create.deposit_price,
      tenement_floor: tenementRent.Tenement_Create.tenement_floor,
      tenement_host_name: tenementRent.Tenement_Create.tenement_host_name,
      tenement_host_telphone:
        tenementRent.Tenement_Create.tenement_host_telphone,
      tenement_host_phone: tenementRent.Tenement_Create.tenement_host_phone,
      tenement_host_line: tenementRent.Tenement_Create.tenement_host_line,
      tenement_host_remittance_bank:
        tenementRent.Tenement_Create.tenement_host_remittance_bank,
      tenement_host_remittance_account:
        tenementRent.Tenement_Create.tenement_host_remittance_account,
      tenement_host_address: tenementRent.Tenement_Create.tenement_host_address,
      tenement_host_birthday:
        tenementRent.Tenement_Create.tenement_host_birthday,
      tenement_host_hobby: tenementRent.Tenement_Create.tenement_host_hobby,
      tenement_host_remark: tenementRent.Tenement_Create.tenement_host_remark,
      renter_start_date: tenementRent.renter_start_date,
      renter_end_date: tenementRent.renter_end_date,
      renter_name: tenementRent.renter_name,
      renter_id_images: renterIdImagesArray,
      renter_phone: tenementRent.renter_phone,
      renter_jobtitle: tenementRent.renter_jobtitle,
      renter_guarantor_name: tenementRent.renter_guarantor_name,
      renter_guarantor_phone: tenementRent.renter_guarantor_phone,
      renter_remark: tenementRent.renter_remark,
    };

    return { message: 'Successfully update the media', data };
  }

  async getTenementDevelopById(
    tenementId: number,
    userId: number,
    isAdmin: boolean,
  ): Promise<{ message: string; data: any }> {
    const tenementDevelop = await this.prisma.tenement_Develop.findUnique({
      where: { tenement_id: tenementId },
      include: {
        Tenement_Create: {
          include: {
            Tenement: true,
          },
        },
      },
    });

    if (!tenementDevelop) {
      throw new NotFoundException('Tenement develop not found.');
    }

    if (!isAdmin && tenementDevelop.Tenement_Create.Tenement.owner !== userId) {
      throw new ForbiddenException(
        'Access to this tenement develop is forbidden.',
      );
    }
    const tenementImagesArray = tenementDevelop.Tenement_Create.Tenement.tenement_images
    ? tenementDevelop.Tenement_Create.Tenement.tenement_images.split(',').filter(img => img.trim() !== '')
    : [];
      
    const data = {
      tenement_id: tenementDevelop.Tenement_Create.Tenement.id,
      tenement_address:
        tenementDevelop.Tenement_Create.Tenement.tenement_address,
      tenement_product_type:
        tenementDevelop.Tenement_Create.Tenement.tenement_product_type,
      tenement_type: tenementDevelop.Tenement_Create.Tenement.tenement_type,
      tenement_face: tenementDevelop.Tenement_Create.Tenement.tenement_face,
      tenement_images: tenementImagesArray,
      total_rating: tenementDevelop.Tenement_Create.total_rating,
      main_building: tenementDevelop.Tenement_Create.main_building,
      affiliated_building: tenementDevelop.Tenement_Create.affiliated_building,
      public_building: tenementDevelop.Tenement_Create.public_building,
      unregistered_area: tenementDevelop.Tenement_Create.unregistered_area,
      management_magnification:
        tenementDevelop.Tenement_Create.management_magnification,
      management_fee: tenementDevelop.Tenement_Create.management_fee,
      selling_price: tenementDevelop.Tenement_Create.selling_price,
      rent_price: tenementDevelop.Tenement_Create.rent_price,
      deposit_price: tenementDevelop.Tenement_Create.deposit_price,
      tenement_floor: tenementDevelop.Tenement_Create.tenement_floor,
      tenement_host_name: tenementDevelop.Tenement_Create.tenement_host_name,
      tenement_host_telphone:
        tenementDevelop.Tenement_Create.tenement_host_telphone,
      tenement_host_phone: tenementDevelop.Tenement_Create.tenement_host_phone,
      tenement_host_line: tenementDevelop.Tenement_Create.tenement_host_line,
      tenement_host_remittance_bank:
        tenementDevelop.Tenement_Create.tenement_host_remittance_bank,
      tenement_host_remittance_account:
        tenementDevelop.Tenement_Create.tenement_host_remittance_account,
      tenement_host_address:
        tenementDevelop.Tenement_Create.tenement_host_address,
      tenement_host_birthday:
        tenementDevelop.Tenement_Create.tenement_host_birthday,
      tenement_host_hobby: tenementDevelop.Tenement_Create.tenement_host_hobby,
      tenement_host_remark:
        tenementDevelop.Tenement_Create.tenement_host_remark,
    };

    return { message: 'Successfully update the media', data };
  }

  async getTenementMarketById(
    tenementId: number,
    userId: number,
    isAdmin: boolean,
  ): Promise<{ message: string; data: any }> {
    const tenementMarket = await this.prisma.tenement_Market.findUnique({
      where: { tenement_id: tenementId },
      include: {
        Tenement: true,
      },
    });

    if (!tenementMarket) {
      throw new NotFoundException('Tenement market not found.');
    }

    if (!isAdmin && tenementMarket.Tenement.owner !== userId) {
      throw new ForbiddenException(
        'Access to this tenement market is forbidden.',
      );
    }
    const tenementImagesArray = tenementMarket.Tenement.tenement_images
    ? tenementMarket.Tenement.tenement_images.split(',').filter(img => img)
    : [];
    const data = {
      tenement_address: tenementMarket.Tenement.tenement_address,
      tenement_product_type: tenementMarket.Tenement.tenement_product_type,
      tenement_type: tenementMarket.Tenement.tenement_type,
      tenement_face: tenementMarket.Tenement.tenement_face,
      tenement_images: tenementImagesArray,
      tenement_host_name: tenementMarket.tenement_host_name,
      tenement_host_telphone: tenementMarket.tenement_host_telphone,
      tenement_host_phone: tenementMarket.tenement_host_phone,
      tenement_host_line: tenementMarket.tenement_host_line,
      tenement_host_remittance_bank:
        tenementMarket.tenement_host_remittance_bank,
      tenement_host_remittance_account:
        tenementMarket.tenement_host_remittance_account,
      tenement_host_address: tenementMarket.tenement_host_address,
      tenement_host_birthday: tenementMarket.tenement_host_birthday,
      tenement_host_hobby: tenementMarket.tenement_host_hobby,
      tenement_host_remark: tenementMarket.tenement_host_remark,
      tenement_area_max: tenementMarket.tenement_area_max,
      tenement_area_min: tenementMarket.tenement_area_min,
      burget_rent_max: tenementMarket.burget_rent_max,
      burget_rent_min: tenementMarket.burget_rent_min,
      hopefloor_max: tenementMarket.hopefloor_max,
      hopefloor_min: tenementMarket.hopefloor_min,
      market_state: tenementMarket.market_state,
    };

    return { message: 'Successfully update the media', data };
  }

  async createTenementRent(createTenementRentDto: CreateTenementRentDto, userId: number) {
    let tenement;
    const { tenement_id, renter_id_images, tenement_images, ...rest } = createTenementRentDto;
    const renterIdImagesAsString = renter_id_images.join(',');
    const tenementIdImagesAsString = tenement_images.join(',');
  
    // 检查 Tenement 是否存在
    if (tenement_id) {
      tenement = await this.prisma.tenement.findUnique({
        where: { id: tenement_id },
      });
  
      // 如果 Tenement 存在，则更新
      if (tenement) {
        tenement = await this.prisma.tenement.update({
          where: { id: tenement_id },
          data: {
            tenement_address: rest.tenement_address,
            tenement_product_type: rest.tenement_product_type,
            tenement_type: rest.tenement_type,
            tenement_status: rest.tenement_status,
            tenement_face: rest.tenement_face,
            tenement_images: tenementIdImagesAsString,
            owner: userId,
            is_deleted: false,
          },
        });
      }
    }
  
    // 如果 Tenement 不存在，则创建新的 Tenement
    if (!tenement) {
      tenement = await this.prisma.tenement.create({
        data: {
          tenement_address: rest.tenement_address,
          tenement_product_type: rest.tenement_product_type,
          tenement_type: rest.tenement_type,
          tenement_status: rest.tenement_status,
          tenement_face: rest.tenement_face,
          tenement_images: tenementIdImagesAsString,
          owner: userId,
          is_deleted: false,
        },
      });
    }
  
    // 检查 TenementCreate 是否存在
    let tenementCreate = await this.prisma.tenement_Create.findUnique({
      where: { tenement_id: tenement.id },
    });
  
    // 如果 TenementCreate 存在，则更新；否则，创建新的
    if (tenementCreate) {
      tenementCreate = await this.prisma.tenement_Create.update({
        where: { tenement_id: tenement.id },
        data: {
          // 更新的字段
          total_rating: rest.total_rating,
          main_building: rest.main_building,
          inside_rating: rest.main_building + rest.affiliated_building,
          affiliated_building: rest.affiliated_building,
          public_building: rest.public_building,
          unregistered_area: rest.unregistered_area,
          management_magnification: rest.management_magnification,
          management_fee: rest.management_fee,
          tenement_floor: rest.tenement_floor,
          tenement_host_name: rest.tenement_host_name,
          tenement_host_telphone: rest.tenement_host_telphone,
          tenement_host_phone: rest.tenement_host_phone,
          tenement_host_line: rest.tenement_host_line,
          tenement_host_remittance_bank: rest.tenement_host_remittance_bank,
          tenement_host_remittance_account: rest.tenement_host_remittance_account,
          tenement_host_address: rest.tenement_host_address,
          tenement_host_birthday: rest.tenement_host_birthday,
          tenement_host_hobby: rest.tenement_host_hobby,
          tenement_host_remark: rest.tenement_host_remark,
          rent_price: rest.rent_price,
        },
      });
    } else {
      tenementCreate = await this.prisma.tenement_Create.create({
        data: {
          tenement_id: tenement.id,
          // 创建的字段
          total_rating: rest.total_rating,
          main_building: rest.main_building,
          inside_rating: rest.main_building + rest.affiliated_building,
          affiliated_building: rest.affiliated_building,
          public_building: rest.public_building,
          unregistered_area: rest.unregistered_area,
          management_magnification: rest.management_magnification,
          management_fee: rest.management_fee,
          tenement_floor: rest.tenement_floor,
          tenement_host_name: rest.tenement_host_name,
          tenement_host_telphone: rest.tenement_host_telphone,
          tenement_host_phone: rest.tenement_host_phone,
          tenement_host_line: rest.tenement_host_line,
          tenement_host_remittance_bank: rest.tenement_host_remittance_bank,
          tenement_host_remittance_account: rest.tenement_host_remittance_account,
          tenement_host_address: rest.tenement_host_address,
          tenement_host_birthday: rest.tenement_host_birthday,
          tenement_host_hobby: rest.tenement_host_hobby,
          tenement_host_remark: rest.tenement_host_remark,
          rent_price: rest.rent_price,
        },
      });
    }
  
    // 检查 TenementRent 是否存在
    let tenementRent = await this.prisma.tenement_Rent.findUnique({
      where: { tenement_id: tenement.id },
    });
  
    // 如果 TenementRent 存在，则更新；否则，创建新的
    if (tenementRent) {
      tenementRent = await this.prisma.tenement_Rent.update({
        where: { tenement_id: tenement.id },
        data: {
          // 更新的字段
          tenement_status: rest.tenement_status,
          renter_start_date: rest.renter_start_date,
          renter_end_date: rest.renter_end_date,
          renter_name: rest.renter_name,
          renter_id_images: renterIdImagesAsString,
          renter_phone: rest.renter_phone,
          renter_jobtitle: rest.renter_jobtitle,
          renter_guarantor_name: rest.renter_guarantor_name,
          renter_guarantor_phone: rest.renter_guarantor_phone,
          renter_remark: rest.renter_remark,
          is_deleted: false,
        },
      });
    } else {
      tenementRent = await this.prisma.tenement_Rent.create({
        data: {
          tenement_id: tenement.id,
          // 创建的字段
          tenement_status: rest.tenement_status,
          renter_start_date: rest.renter_start_date,
          renter_end_date: rest.renter_end_date,
          renter_name: rest.renter_name,
          renter_id_images: renterIdImagesAsString,
          renter_phone: rest.renter_phone,
          renter_jobtitle: rest.renter_jobtitle,
          renter_guarantor_name: rest.renter_guarantor_name,
          renter_guarantor_phone: rest.renter_guarantor_phone,
          renter_remark: rest.renter_remark,
          is_deleted: false,
        },
      });
    }
  
    return {
      message: 'Successfully processed the tenement rent',
      data: { tenement_id: tenement.id }
    };
  }

  async createTenementSell(createTenementSellDto: CreateTenementSellDto, userId: number) {
    const { tenement_id, buyer_id_images, tenement_images, ...rest } = createTenementSellDto;
    const sellIdImagesAsString = buyer_id_images.join(',');
    const tenementIdImagesAsString = tenement_images.join(',');
    let tenement;
  
    // 检查 Tenement 是否存在
    if (tenement_id) {
      tenement = await this.prisma.tenement.findUnique({
        where: { id: tenement_id },
      });
  
      // 如果 Tenement 存在，则更新
      if (tenement) {
        tenement = await this.prisma.tenement.update({
          where: { id: tenement_id },
          data: {
            tenement_address: rest.tenement_address,
            tenement_product_type: rest.tenement_product_type,
            tenement_type: rest.tenement_type,
            tenement_status: rest.tenement_status,
            tenement_face: rest.tenement_face,
            tenement_images: tenementIdImagesAsString,
            owner: userId,
            is_deleted: false,
          },
        });
      }
    }
  
    // 如果 Tenement 不存在，则创建新的 Tenement
    if (!tenement) {
      tenement = await this.prisma.tenement.create({
        data: {
          tenement_address: rest.tenement_address,
          tenement_product_type: rest.tenement_product_type,
          tenement_type: rest.tenement_type,
          tenement_status: rest.tenement_status,
          tenement_face: rest.tenement_face,
          tenement_images: tenementIdImagesAsString,
          owner: userId,
          is_deleted: false,
        },
      });
    }
  
    // 检查 TenementCreate 是否存在
    let tenementCreate = await this.prisma.tenement_Create.findUnique({
      where: { tenement_id: tenement.id },
    });
  
    // 如果 TenementCreate 存在，则更新；否则，创建新的
    if (tenementCreate) {
      tenementCreate = await this.prisma.tenement_Create.update({
        where: { tenement_id: tenement.id },
        data: {
          // 更新的字段
          total_rating: rest.total_rating,
          main_building: rest.main_building,
          inside_rating: rest.main_building + rest.affiliated_building,
          affiliated_building: rest.affiliated_building,
          public_building: rest.public_building,
          unregistered_area: rest.unregistered_area,
          management_magnification: rest.management_magnification,
          management_fee: rest.management_fee,
          tenement_floor: rest.tenement_floor,
          tenement_host_name: rest.tenement_host_name,
          tenement_host_telphone: rest.tenement_host_telphone,
          tenement_host_phone: rest.tenement_host_phone,
          tenement_host_line: rest.tenement_host_line,
          tenement_host_remittance_bank: rest.tenement_host_remittance_bank,
          tenement_host_remittance_account: rest.tenement_host_remittance_account,
          tenement_host_address: rest.tenement_host_address,
          tenement_host_birthday: rest.tenement_host_birthday,
          tenement_host_hobby: rest.tenement_host_hobby,
          tenement_host_remark: rest.tenement_host_remark,
          selling_price: rest.selling_price,
        },
      });
    } else {
      tenementCreate = await this.prisma.tenement_Create.create({
        data: {
          tenement_id: tenement.id,
          // 创建的字段
          total_rating: rest.total_rating,
          main_building: rest.main_building,
          inside_rating: rest.main_building + rest.affiliated_building,
          affiliated_building: rest.affiliated_building,
          public_building: rest.public_building,
          unregistered_area: rest.unregistered_area,
          management_magnification: rest.management_magnification,
          management_fee: rest.management_fee,
          tenement_floor: rest.tenement_floor,
          tenement_host_name: rest.tenement_host_name,
          tenement_host_telphone: rest.tenement_host_telphone,
          tenement_host_phone: rest.tenement_host_phone,
          tenement_host_line: rest.tenement_host_line,
          tenement_host_remittance_bank: rest.tenement_host_remittance_bank,
          tenement_host_remittance_account: rest.tenement_host_remittance_account,
          tenement_host_address: rest.tenement_host_address,
          tenement_host_birthday: rest.tenement_host_birthday,
          tenement_host_hobby: rest.tenement_host_hobby,
          tenement_host_remark: rest.tenement_host_remark,
          selling_price: rest.selling_price,
        },
      });
    }
  
    // 检查 TenementSell 是否存在
    let tenementSell = await this.prisma.tenement_Sell.findUnique({
      where: { tenement_id: tenement.id },
    });
  
    // 如果 TenementSell 存在，则更新；否则，创建新的
    if (tenementSell) {
      tenementSell = await this.prisma.tenement_Sell.update({
        where: { tenement_id: tenement.id },
        data: {
          // 更新的字段
          buyer_order_date: rest.buyer_order_date,
          buyer_handout_date: rest.buyer_handout_date,
          buyer_name: rest.buyer_name,
          buyer_id_images: sellIdImagesAsString,
          buyer_phone: rest.buyer_phone,
          buyer_jobtitle: rest.buyer_jobtitle,
          buyer_remark: rest.buyer_remark,
        },
      });
    } else {
      tenementSell = await this.prisma.tenement_Sell.create({
        data: {
          tenement_id: tenement.id,
          // 创建的字段
          buyer_order_date: rest.buyer_order_date,
          buyer_handout_date: rest.buyer_handout_date,
          buyer_name: rest.buyer_name,
          buyer_id_images: sellIdImagesAsString,
          buyer_phone: rest.buyer_phone,
          buyer_jobtitle: rest.buyer_jobtitle,
          buyer_remark: rest.buyer_remark,
        },
      });
    }
  
    return { message: 'Successfully processed the tenement sell', data: { tenement_id: tenement.id } };
  }

  async createTenementDevelop(
    createTenementDevelopDto: CreateTenementDevelopDto,
    userId: number,
  ) {
    const tenementIdImagesAsString =
      createTenementDevelopDto.tenement_images.join(',');
    const tenement = await this.prisma.tenement.create({
      data: {
        tenement_address: createTenementDevelopDto.tenement_address,
        tenement_product_type: createTenementDevelopDto.tenement_product_type,
        tenement_type: createTenementDevelopDto.tenement_type,
        tenement_face: createTenementDevelopDto.tenement_face,
        tenement_images: tenementIdImagesAsString,
        owner: userId,
        tenement_status: createTenementDevelopDto.tenement_status || "未成交",
        is_deleted: false,
      },
    });

    // 创建 Tenement_Create 记录
    const tenementCreate = await this.prisma.tenement_Create.create({
      data: {
        tenement_id: tenement.id,
        total_rating: createTenementDevelopDto.total_rating,
        main_building: createTenementDevelopDto.main_building,
        inside_rating:
          createTenementDevelopDto.main_building +
          createTenementDevelopDto.affiliated_building,
        affiliated_building: createTenementDevelopDto.affiliated_building,
        public_building: createTenementDevelopDto.public_building,
        unregistered_area: createTenementDevelopDto.unregistered_area,
        management_magnification:
          createTenementDevelopDto.management_magnification,
        management_fee: createTenementDevelopDto.management_fee,
        selling_price: 0,
        rent_price: 0,
        deposit_price: createTenementDevelopDto.deposit_price,
        tenement_floor: createTenementDevelopDto.tenement_floor,
        tenement_host_name: createTenementDevelopDto.tenement_host_name,
        tenement_host_telphone: createTenementDevelopDto.tenement_host_telphone,
        tenement_host_phone: createTenementDevelopDto.tenement_host_phone,
        tenement_host_line: createTenementDevelopDto.tenement_host_line,
        tenement_host_remittance_bank:
          createTenementDevelopDto.tenement_host_remittance_bank,
        tenement_host_remittance_account:
          createTenementDevelopDto.tenement_host_remittance_account,
        tenement_host_address: createTenementDevelopDto.tenement_host_address,
        tenement_host_birthday: createTenementDevelopDto.tenement_host_birthday,
        tenement_host_hobby: createTenementDevelopDto.tenement_host_hobby,
        tenement_host_remark: createTenementDevelopDto.tenement_host_remark,
      },
    });

    // 创建 Tenement_Develop 记录
    await this.prisma.tenement_Develop.create({
      data: {
        tenement_id: tenementCreate.tenement_id,
        is_deleted: false,
      },
    });

    return { message: 'Successfully add the media', data: { tenement_id: tenement.id } };
  }

  async createTenementMarket(createTenementMarketDto: CreateTenementMarketDto, userId: number) {
    const tenementId = createTenementMarketDto.tenement_id;
    let tenement;

    // 检查是否已有 Tenement 数据
    if (tenementId) {
      tenement = await this.prisma.tenement.findUnique({
        where: { id: tenementId },
      });

      // 如果 Tenement 存在，则更新
      if (tenement) {
        tenement = await this.prisma.tenement.update({
          where: { id: tenementId },
          data: {
            tenement_address: createTenementMarketDto.tenement_address,
            tenement_product_type: createTenementMarketDto.tenement_product_type,
            tenement_type: createTenementMarketDto.tenement_type,
            tenement_face: createTenementMarketDto.tenement_face,
            tenement_images: createTenementMarketDto.tenement_images.join(','),
            tenement_status: createTenementMarketDto.tenement_status || "未成交",
            // 其他可能需要更新的字段...
          },
        });
      }
    }

    // 如果 Tenement 不存在，则创建新的 Tenement
    if (!tenement) {
      tenement = await this.prisma.tenement.create({
        data: {
          tenement_address: createTenementMarketDto.tenement_address,
          tenement_product_type: createTenementMarketDto.tenement_product_type,
          tenement_type: createTenementMarketDto.tenement_type,
          tenement_face: createTenementMarketDto.tenement_face,
          tenement_images: createTenementMarketDto.tenement_images.join(','),
          owner: userId,
          tenement_status: createTenementMarketDto.tenement_status || "未成交",
          is_deleted: false,
          // 其他需要在创建时包含的字段...
        },
      });
    }

    // 检查 Tenement_Market 是否存在
    const existingTenementMarket = await this.prisma.tenement_Market.findUnique({
      where: { tenement_id: tenement.id },
    });

    // 如果存在，更新 Tenement_Market
    if (existingTenementMarket) {
      await this.prisma.tenement_Market.update({
        where: { tenement_id: tenement.id },
        data: {
          // 更新 Tenement_Market 的字段...
        },
      });
    } else {
      // 如果不存在，创建新的 Tenement_Market
      await this.prisma.tenement_Market.create({
        data: {
          tenement_id: tenement.id,
          tenement_host_name: createTenementMarketDto.tenement_host_name,
          tenement_host_telphone: createTenementMarketDto.tenement_host_telphone,
          tenement_host_phone: createTenementMarketDto.tenement_host_phone,
          tenement_host_line: createTenementMarketDto.tenement_host_line,
          tenement_host_remittance_bank: createTenementMarketDto.tenement_host_remittance_bank,
          tenement_host_remittance_account: createTenementMarketDto.tenement_host_remittance_account,
          tenement_host_address: createTenementMarketDto.tenement_host_address,
          tenement_host_birthday: createTenementMarketDto.tenement_host_birthday,
          tenement_host_hobby: createTenementMarketDto.tenement_host_hobby,
          tenement_host_remark: createTenementMarketDto.tenement_host_remark,
          tenement_area_max: createTenementMarketDto.tenement_area_max,
          tenement_area_min: createTenementMarketDto.tenement_area_min,
          burget_rent_max: createTenementMarketDto.burget_rent_max,
          burget_rent_min: createTenementMarketDto.burget_rent_min,
          hopefloor_max: createTenementMarketDto.hopefloor_max,
          hopefloor_min: createTenementMarketDto.hopefloor_min,
          market_state: createTenementMarketDto.market_state,
          // 其他 Tenement_Market 的相关字段...
        },
      });
    }

    return { message: 'Successfully processed the tenement', data: { tenement_id: tenement.id } };
  }

  async deleteTenementRent(tenementId: number): Promise<{ message: string }> {
    await this.prisma.tenement_Rent.updateMany({
      where: {
        tenement_id: tenementId,
        is_deleted: false,
      },
      data: {
        is_deleted: true,
      },
    });

    return { message: 'Tenement rent successfully deleted' };
  }

  async deleteTenementDevelop(
    tenementId: number,
  ): Promise<{ message: string }> {
    await this.prisma.tenement_Develop.updateMany({
      where: {
        tenement_id: tenementId,
        is_deleted: false,
      },
      data: {
        is_deleted: true,
      },
    });

    return { message: 'Tenement develop successfully deleted' };
  }

  async deleteTenementMarket(tenementId: number): Promise<{ message: string }> {
    await this.prisma.tenement_Market.updateMany({
      where: {
        tenement_id: tenementId,
        is_deleted: false,
      },
      data: {
        is_deleted: true,
      },
    });

    return { message: 'Tenement market successfully deleted' };
  }

  async deleteTenementSell(tenementId: number): Promise<{ message: string }> {
    await this.prisma.tenement_Sell.updateMany({
      where: {
        tenement_id: tenementId,
        is_deleted: false, // 只更新未被删除的记录
      },
      data: {
        is_deleted: true,
      },
    });

    return { message: 'Tenement sell successfully deleted' };
  }

  async updateTenementSell(
    updateTenementSellDto: UpdateTenementSellDto,
  ): Promise<{ message: string }> {
    const { tenement_id, ...updateData } = updateTenementSellDto;
    const buyerIdImagesAsString =
      updateTenementSellDto.buyer_id_images.join(',');
    const tenementIdImagesAsString =
      updateTenementSellDto.tenement_images.join(',');

    await this.prisma.tenement.update({
      where: { id: tenement_id },
      data: {
        tenement_address: updateData.tenement_address,
        tenement_product_type: updateData.tenement_product_type,
        tenement_type: updateData.tenement_type,
        tenement_face: updateData.tenement_face,
        tenement_images: tenementIdImagesAsString,
        tenement_status: updateData.tenement_status,
      },
    });

    // 更新 Tenement_Create 记录
    await this.prisma.tenement_Create.update({
      where: { tenement_id: tenement_id },
      data: {
        total_rating: updateData.total_rating,
        main_building: updateData.main_building,
        affiliated_building: updateData.affiliated_building,
        public_building: updateData.public_building,
        unregistered_area: updateData.unregistered_area,
        management_magnification: updateData.management_magnification,
        management_fee: updateData.management_fee,
        selling_price: updateData.selling_price,
        tenement_floor: updateData.tenement_floor,
        tenement_host_name: updateData.tenement_host_name,
        tenement_host_telphone: updateData.tenement_host_telphone,
        tenement_host_phone: updateData.tenement_host_phone,
        tenement_host_line: updateData.tenement_host_line,
        tenement_host_remittance_bank: updateData.tenement_host_remittance_bank,
        tenement_host_remittance_account:
          updateData.tenement_host_remittance_account,
        tenement_host_address: updateData.tenement_host_address,
        tenement_host_birthday: updateData.tenement_host_birthday,
        tenement_host_hobby: updateData.tenement_host_hobby,
        tenement_host_remark: updateData.tenement_host_remark,
      },
    });

    // 更新 Tenement_Sell 记录
    await this.prisma.tenement_Sell.update({
      where: { tenement_id: tenement_id },
      data: {
        buyer_order_date: updateData.buyer_order_date,
        buyer_handout_date: updateData.buyer_handout_date,
        buyer_name: updateData.buyer_name,
        buyer_id_images: buyerIdImagesAsString,
        buyer_phone: updateData.buyer_phone,
        buyer_jobtitle: updateData.buyer_jobtitle,
        buyer_remark: updateData.buyer_remark,
      },
    });

    return { message: 'Successfully update the media' };
  }

  async updateTenementRent(
    updateTenementRentDto: UpdateTenementRentDto,
  ): Promise<{ message: string }> {
    const { tenement_id, ...updateData } = updateTenementRentDto;
    const tenementIdImagesAsString =
      updateTenementRentDto.tenement_images.join(',');
    const rentIdImagesAsString =
      updateTenementRentDto.renter_id_images.join(',');

    await this.prisma.tenement.update({
      where: { id: tenement_id },
      data: {
        tenement_address: updateData.tenement_address,
        tenement_product_type: updateData.tenement_product_type,
        tenement_type: updateData.tenement_type,
        tenement_face: updateData.tenement_face,
        tenement_images: tenementIdImagesAsString,
        tenement_status: updateData.tenement_status,
        // 可以添加其他 Tenement 字段
      },
    });

    // 更新 Tenement_Create 记录
    await this.prisma.tenement_Create.update({
      where: { tenement_id: tenement_id },
      data: {
        total_rating: updateData.total_rating,
        main_building: updateData.main_building,
        inside_rating:
          updateData.main_building + updateData.affiliated_building,
        affiliated_building: updateData.affiliated_building,
        public_building: updateData.public_building,
        unregistered_area: updateData.unregistered_area,
        management_magnification: updateData.management_magnification,
        management_fee: updateData.management_fee,
        selling_price: updateData.selling_price,
        rent_price: updateData.rent_price,
        deposit_price: updateData.deposit_price,
        tenement_floor: updateData.tenement_floor,
        tenement_host_name: updateData.tenement_host_name,
        tenement_host_telphone: updateData.tenement_host_telphone,
        tenement_host_phone: updateData.tenement_host_phone,
        tenement_host_line: updateData.tenement_host_line,
        tenement_host_remittance_bank: updateData.tenement_host_remittance_bank,
        tenement_host_remittance_account:
          updateData.tenement_host_remittance_account,
        tenement_host_address: updateData.tenement_host_address,
        tenement_host_birthday: updateData.tenement_host_birthday,
        tenement_host_hobby: updateData.tenement_host_hobby,
        tenement_host_remark: updateData.tenement_host_remark,
        // 可以添加其他 Tenement_Create 字段
      },
    });

    // 更新 Tenement_Rent 记录
    await this.prisma.tenement_Rent.update({
      where: { tenement_id: tenement_id },
      data: {
        renter_start_date: updateData.renter_start_date,
        renter_end_date: updateData.renter_end_date,
        renter_name: updateData.renter_name,
        renter_id_images: rentIdImagesAsString,
        renter_phone: updateData.renter_phone,
        renter_jobtitle: updateData.renter_jobtitle,
        renter_guarantor_name: updateData.renter_guarantor_name,
        renter_guarantor_phone: updateData.renter_guarantor_phone,
        renter_remark: updateData.renter_remark,
        // 可以添加其他 Tenement_Rent 字段
      },
    });

    return { message: 'Tenement rent successfully updated' };
  }

  async updateTenementDevelop(
    tenementId: number,
    updateTenementDevelopDto: UpdateTenementDevelopDto,
  ): Promise<{ message: string }> {
    const { ...updateData } = updateTenementDevelopDto;
    const tenementIdImagesAsString =
      updateTenementDevelopDto.tenement_images.join(',');
    // 更新 Tenement 记录
    await this.prisma.tenement.update({
      where: { id: tenementId },
      data: {
        tenement_address: updateData.tenement_address,
        tenement_product_type: updateData.tenement_product_type,
        tenement_type: updateData.tenement_type,
        tenement_face: updateData.tenement_face,
        tenement_images: tenementIdImagesAsString,
        tenement_status: updateData.tenement_status,
      },
    });

    // 更新 Tenement_Create 记录
    await this.prisma.tenement_Create.update({
      where: { tenement_id: tenementId },
      data: {
        total_rating: updateData.total_rating,
        main_building: updateData.main_building,
        inside_rating:
          updateData.main_building + updateData.affiliated_building,
        affiliated_building: updateData.affiliated_building,
        public_building: updateData.public_building,
        unregistered_area: updateData.unregistered_area,
        management_magnification: updateData.management_magnification,
        management_fee: updateData.management_fee,
        selling_price: updateData.selling_price,
        rent_price: updateData.rent_price,
        deposit_price: updateData.deposit_price,
        tenement_floor: updateData.tenement_floor,
        tenement_host_name: updateData.tenement_host_name,
        tenement_host_telphone: updateData.tenement_host_telphone,
        tenement_host_phone: updateData.tenement_host_phone,
        tenement_host_line: updateData.tenement_host_line,
        tenement_host_remittance_bank: updateData.tenement_host_remittance_bank,
        tenement_host_remittance_account:
          updateData.tenement_host_remittance_account,
        tenement_host_address: updateData.tenement_host_address,
        tenement_host_birthday: updateData.tenement_host_birthday,
        tenement_host_hobby: updateData.tenement_host_hobby,
        tenement_host_remark: updateData.tenement_host_remark,
      },
    });

    return { message: 'Tenement develop successfully updated' };
  }

  async updateTenementMarket(
    tenementId: number,
    updateTenementMarketDto: UpdateTenementMarketDto,
  ): Promise<{ message: string }> {
    const tenementIdImagesAsString =
      updateTenementMarketDto.tenement_images.join(',');
    await this.prisma.tenement.update({
      where: { id: tenementId },
      data: {
        tenement_address: updateTenementMarketDto.tenement_address,
        tenement_product_type: updateTenementMarketDto.tenement_product_type,
        tenement_type: updateTenementMarketDto.tenement_type,
        tenement_face: updateTenementMarketDto.tenement_face,
        tenement_images: tenementIdImagesAsString,
        tenement_status: updateTenementMarketDto.tenement_status,
      },
    });

    // 更新 Tenement_Market 记录
    await this.prisma.tenement_Market.update({
      where: { tenement_id: tenementId },
      data: {
        tenement_host_name: updateTenementMarketDto.tenement_host_name,
        tenement_host_telphone: updateTenementMarketDto.tenement_host_telphone,
        tenement_host_phone: updateTenementMarketDto.tenement_host_phone,
        tenement_host_line: updateTenementMarketDto.tenement_host_line,
        tenement_host_remittance_bank:
          updateTenementMarketDto.tenement_host_remittance_bank,
        tenement_host_remittance_account:
          updateTenementMarketDto.tenement_host_remittance_account,
        tenement_host_address: updateTenementMarketDto.tenement_host_address,
        tenement_host_birthday: updateTenementMarketDto.tenement_host_birthday,
        tenement_host_hobby: updateTenementMarketDto.tenement_host_hobby,
        tenement_host_remark: updateTenementMarketDto.tenement_host_remark,
        tenement_area_max: updateTenementMarketDto.tenement_area_max,
        tenement_area_min: updateTenementMarketDto.tenement_area_min,
        burget_rent_max: updateTenementMarketDto.burget_rent_max,
        burget_rent_min: updateTenementMarketDto.burget_rent_min,
        hopefloor_max: updateTenementMarketDto.hopefloor_max,
        hopefloor_min: updateTenementMarketDto.hopefloor_min,
        market_state: updateTenementMarketDto.market_state,
      },
    });

    return { message: 'Tenement market successfully updated' };
  }

  async getFilteredTenements(query): Promise<GetTenementsFilterDto[]> {
    const {
      tenement_address,
      tenement_product_type,
      tenement_status,
      tenement_face,
      tenement_type,
      rent_price_min,
      rent_price_max,
      selling_price_min,
      selling_price_max,
      floor_min,
      floor_max,
    } = query;

    const whereClause: any = {};

    if (tenement_address) {
      whereClause.tenement_address = { contains: tenement_address };
    }
    if (tenement_product_type) {
      whereClause.tenement_product_type = { equals: tenement_product_type };
    }
    if (tenement_status) {
      whereClause.tenement_status = { equals: tenement_status };
    }
    if (tenement_face) {
      whereClause.tenement_face = { equals: tenement_face };
    }
    if (tenement_type) {
      whereClause.tenement_type = { equals: tenement_type };
    }
    if (selling_price_min && selling_price_max) {
      whereClause.selling_price = {
        gte: parseInt(selling_price_min),
        lte: parseInt(selling_price_max),
      };
    }
    if (rent_price_min && rent_price_max) {
      whereClause.rent_price = {
        gte: parseInt(rent_price_min),
        lte: parseInt(rent_price_max),
      };
    }
    if (floor_min && floor_max) {
      whereClause.tenement_floor = {
        gte: parseInt(floor_min),
        lte: parseInt(floor_max),
      };
    }

    return this.prisma.tenement.findMany({
      where: whereClause,
      include: { Tenement_Create: true },
    });
  }

  async getFilteredTenementsForUser(
    query,
    userId: number,
  ): Promise<GetTenementsFilterDto[]> {
    const {
      tenement_address,
      tenement_product_type,
      tenement_status,
      tenement_face,
      tenement_type,
      rent_price_min,
      rent_price_max,
      selling_price_min,
      selling_price_max,
      floor_min,
      floor_max,
    } = query;

    const whereClause: WhereClause = {};
    if (userId) {
      whereClause.userId = { equals: userId };
    }
    if (tenement_address) {
      whereClause.tenement_address = { contains: tenement_address };
    }
    if (tenement_product_type) {
      whereClause.tenement_product_type = { equals: tenement_product_type };
    }
    if (tenement_status) {
      whereClause.tenement_status = { equals: tenement_status };
    }
    if (tenement_face) {
      whereClause.tenement_face = { equals: tenement_face };
    }
    if (tenement_type) {
      whereClause.tenement_type = { equals: tenement_type };
    }
    if (selling_price_min && selling_price_max) {
      whereClause.selling_price = {
        gte: parseInt(selling_price_min),
        lte: parseInt(selling_price_max),
      };
    }
    if (rent_price_min && rent_price_max) {
      whereClause.rent_price = {
        gte: parseInt(rent_price_min),
        lte: parseInt(rent_price_max),
      };
    }
    if (floor_min && floor_max) {
      whereClause.tenement_floor = {
        gte: parseInt(floor_min),
        lte: parseInt(floor_max),
      };
    }

    return this.prisma.tenement.findMany({
      where: whereClause,
      include: { Tenement_Create: true },
    });
  }
  async getFilteredTenementSells(
    isadmin: boolean,
    userId: number,
    query,
  ): Promise<{ message: string; data: GetTenementSellsFilterDto[] }> {
    const whereClause: any = {};

    // 添加基础过滤条件
    if (query.tenement_address) {
      whereClause['Tenement_Create'] = {
        ...whereClause['Tenement_Create'],
        Tenement: {
          ...whereClause['Tenement_Create']?.Tenement,
          tenement_address: { contains: query.tenement_address },
        },
      };
    }
    if (query.tenement_product_type) {
      whereClause['Tenement_Create'] = {
        ...whereClause['Tenement_Create'],
        Tenement: {
          ...whereClause['Tenement_Create']?.Tenement,
          tenement_product_type: { equals: query.tenement_product_type },
        },
      };
    }
    if (query.tenement_status) {
      whereClause['Tenement_Create'] = {
        ...whereClause['Tenement_Create'],
        Tenement: {
          ...whereClause['Tenement_Create']?.Tenement,
          tenement_status: { equals: query.tenement_status },
        },
      };
    }
    if (query.tenement_face) {
      whereClause['Tenement_Create'] = {
        ...whereClause['Tenement_Create'],
        Tenement: {
          ...whereClause['Tenement_Create']?.Tenement,
          tenement_face: { equals: query.tenement_face },
        },
      };
    }
    if (query.tenement_type) {
      whereClause['Tenement_Create'] = {
        ...whereClause['Tenement_Create'],
        Tenement: {
          ...whereClause['Tenement_Create']?.Tenement,
          tenement_type: { equals: query.tenement_type },
        },
      };
    }

    // 范围查询
    if (
      query.selling_price_min !== undefined &&
      query.selling_price_max !== undefined
    ) {
      whereClause['Tenement_Create'] = {
        ...whereClause['Tenement_Create'],
        selling_price: {
          gte: parseFloat(query.selling_price_min),
          lte: parseFloat(query.selling_price_max),
        },
      };
    }
    if (
      query.total_rating_min !== undefined &&
      query.total_rating_max !== undefined
    ) {
      whereClause['Tenement_Create'] = {
        ...whereClause['Tenement_Create'],
        total_rating: {
          gte: parseFloat(query.total_rating_min),
          lte: parseFloat(query.total_rating_max),
        },
      };
    }

    if (
      query.public_building_min !== undefined &&
      query.public_building_max !== undefined
    ) {
      whereClause['Tenement_Create'] = {
        ...whereClause['Tenement_Create'],
        public_building: {
          gte: parseFloat(query.public_building_min),
          lte: parseFloat(query.public_building_max),
        },
      };
    }
    if (query.floor_min !== undefined && query.floor_max !== undefined) {
      whereClause['Tenement_Create'] = {
        ...whereClause['Tenement_Create'],
        tenement_floor: {
          gte: parseInt(query.floor_min),
          lte: parseInt(query.floor_max),
        },
      };
    }
    console.log('Constructed whereClause:', whereClause);
    // 如果用户不是管理员，添加用户ID过滤条件
    if (!isadmin) {
      whereClause['Tenement_Create'] = {
        ...whereClause['Tenement_Create'],
        Tenement: {
          ...whereClause['Tenement_Create']?.Tenement,
          owner: userId,
          is_deleted: false,
        },
      };
    }

    try {
      const tenementSells = await this.prisma.tenement_Sell.findMany({
        where: whereClause,
        include: {
          Tenement_Create: {
            include: {
              Tenement: true,
            },
          },
        },
      });

      const data = tenementSells.map((sell) => ({
        tenement_id: sell.tenement_id,
        tenement_address: sell.Tenement_Create.Tenement.tenement_address,
        tenement_face: sell.Tenement_Create.Tenement.tenement_face,
        tenement_status: sell.Tenement_Create.Tenement.tenement_status,
        tenement_type: sell.Tenement_Create.Tenement.tenement_type,
        tenement_product_type:
          sell.Tenement_Create.Tenement.tenement_product_type,
        management_fee_bottom: sell.Tenement_Create.management_fee,
        management_floor_bottom: sell.Tenement_Create.tenement_floor,
        selling_price: sell.Tenement_Create.selling_price,
        Total_rating: sell.Tenement_Create.total_rating,
        inside_rating: sell.Tenement_Create.inside_rating,
        public_building: sell.Tenement_Create.public_building,
        tenement_floor: sell.Tenement_Create.tenement_floor,
      }));

      return { message: 'Successfully update the media', data };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getFilteredTenementRents(
    isadmin: boolean,
    userId: number,
    query: TenementRentQueryDto,
  ) {
    const whereClause: any = {};

    // 添加基础过滤条件
    if (query.tenement_address) {
      whereClause['Tenement_Create'] = {
        ...whereClause['Tenement_Create'],
        Tenement: {
          ...whereClause['Tenement_Create']?.Tenement,
          tenement_address: { contains: query.tenement_address },
        },
      };
    }
    if (query.tenement_product_type) {
      whereClause['Tenement_Create'] = {
        ...whereClause['Tenement_Create'],
        Tenement: {
          ...whereClause['Tenement_Create']?.Tenement,
          tenement_product_type: { equals: query.tenement_product_type },
        },
      };
    }
    if (query.tenement_status) {
      whereClause['Tenement_Create'] = {
        ...whereClause['Tenement_Create'],
        Tenement: {
          ...whereClause['Tenement_Create']?.Tenement,
          tenement_status: { equals: query.tenement_status },
        },
      };
    }
    if (
      query.selling_price_min !== undefined &&
      query.selling_price_max !== undefined
    ) {
      whereClause['Tenement_Create'] = {
        ...whereClause['Tenement_Create'],
        selling_price: {
          gte: query.selling_price_min,
          lte: query.selling_price_max,
        },
      };
    }
    if (
      query.total_rating_min !== undefined &&
      query.total_rating_max !== undefined
    ) {
      whereClause['Tenement_Create'] = {
        ...whereClause['Tenement_Create'],
        total_rating: {
          gte: query.total_rating_min,
          lte: query.total_rating_max,
        },
      };
    }

    if (
      query.public_building_min !== undefined &&
      query.public_building_max !== undefined
    ) {
      whereClause['Tenement_Create'] = {
        ...whereClause['Tenement_Create'],
        public_building: {
          gte: query.public_building_min,
          lte: query.public_building_max,
        },
      };
    }
    if (query.floor_min !== undefined && query.floor_max !== undefined) {
      whereClause['Tenement_Create'] = {
        ...whereClause['Tenement_Create'],
        tenement_floor: {
          gte: query.floor_min,
          lte: query.floor_max,
        },
      };
    }
    // 如果用户不是管理员，添加用户ID过滤条件
    if (!isadmin) {
      whereClause['Tenement_Create'] = {
        ...whereClause['Tenement_Create'],
        Tenement: {
          ...whereClause['Tenement_Create']?.Tenement,
          owner: userId,
          is_deleted: false,
        },
      };
    }

    try {
      const tenementRents = await this.prisma.tenement_Rent.findMany({
        where: whereClause,
        include: {
          Tenement_Create: {
            include: {
              Tenement: true,
            },
          },
        },
      });

      const data = tenementRents.map((rent) => ({
        tenement_id: rent.tenement_id,
        tenement_address: rent.Tenement_Create.Tenement.tenement_address,
        tenement_face: rent.Tenement_Create.Tenement.tenement_face,
        tenement_status: rent.Tenement_Create.Tenement.tenement_status,
        tenement_type: rent.Tenement_Create.Tenement.tenement_type,
        tenement_product_type:
        rent.Tenement_Create.Tenement.tenement_product_type,
        management_fee_bottom: rent.Tenement_Create.management_fee,
        management_floor_bottom: rent.Tenement_Create.tenement_floor,
        rent: rent.Tenement_Create.rent_price,
        Total_rating: rent.Tenement_Create.total_rating,
        inside_rating: rent.Tenement_Create.inside_rating,
        public_building: rent.Tenement_Create.public_building,
        tenement_floor: rent.Tenement_Create.tenement_floor,
      }));

      return { message: 'Successfully retrieved the tenement rents', data };
    } catch (error) {
      throw new Error(
        'Unable to fetch tenement rents due to an error: ' + error.message,
      );
    }
  }
}
