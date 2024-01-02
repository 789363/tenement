import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { GetUserListDto } from './dto/get-userlist.dto';
import { user } from '@prisma/client';
import { UserData } from './interface/user.interface';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async createUser(createUserDto: { user_name: string; user_email: string; user_password: string; isadmin: boolean, isDelete: boolean }): Promise<UserData> {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        user_email: createUserDto.user_email,
      },
    });

    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.user_password, 10);
    const user = await this.prisma.user.create({
      data: {
        user_name: createUserDto.user_name,
        user_email: createUserDto.user_email,
        user_password: hashedPassword,
        status: true, // 根据业务逻辑设置默认状态
        isadmin: createUserDto.isadmin, // 使用传入的值
        isDelete: createUserDto.isDelete
      },
      select: {
        user_id: true,
        user_name: true,
        user_email: true,
        status: true,
        isadmin: true,
        isDelete: true,
        user_password: false,
        // 注意：不返回 user_password 字段
      }
    });

    return user;
  }

  async findOneByEmail(email: string): Promise<user> {
    const user = await this.prisma.user.findUnique({
      where: {
        user_email: email,
      },
    });

    if (!user) {
      throw new Error('User with this email does not exist');
    }

    return user;
  }

  async updateUser(userId: number, updateData: any): Promise<user> {
    const user = await this.prisma.user.findUnique({
      where: {
        user_id: userId,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }
    if (updateData.user_password) {
      updateData.user_password = await bcrypt.hash(updateData.user_password, 10);
    }

    return this.prisma.user.update({
      where: {
        user_id: userId,
      },
      data: updateData,
    });
  }

  async deleteUser(userId: number, isDeleted: boolean): Promise<user> {
    const user = await this.prisma.user.findUnique({
      where: {
        user_id: userId,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }
    return this.prisma.user.update({
      where: {
        user_id: userId
      },
      data: isDeleted,
    });
  }

  async getUsers(query: GetUserListDto): Promise<UserData[]> {
    const { name, email, status, offset, page } = query;
    const pageSize = 10;

    let whereClause = {};

    if (name) {
      whereClause = { ...whereClause, user_name: { contains: name } };
    }
    if (email) {
      whereClause = { ...whereClause, user_email: { contains: email } };
    }

    if (status !== undefined && status !== null) {
      // 将字符串 "true" 和 "false" 转换为布尔值
      let statusBool: boolean | undefined;
      if (status === 'true') {
        statusBool = true;
      } else if (status === 'false') {
        statusBool = false;
      }
      // 如果 status 不是 "true" 或 "false"，则 statusBool 保持 undefined
      if (statusBool !== undefined) {
        whereClause = { ...whereClause, status: statusBool };
      }
    }
    const skipAmount = typeof offset === 'number' ? offset : (typeof page === 'number' ? (page - 1) * pageSize : 0);
    return this.prisma.user.findMany({
      where: whereClause,
      skip: skipAmount,
      take: pageSize,
      select: {
        user_id: true,
        user_name: true,
        user_email: true,
        status: true,
        isadmin: true,
        isDelete: true,
      },
    });

  }

  async getUserById(userId: number): Promise<UserData> {
    const user = await this.prisma.user.findUnique({
      where: {
        user_id: userId,
      },
      select: {
        user_id: true,
        user_name: true,
        user_email: true,
        status: true,
        isadmin: true,
        isDelete: true,
      }
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}
