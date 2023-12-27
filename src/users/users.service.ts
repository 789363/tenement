import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseInterceptor } from './response.interceptor';
import { GetUserListDto } from './dto/get-userlist.dto';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async createUser(createUserDto: { user_name: string; user_email: string; user_password: string; isadmin: boolean, isDelete: boolean }): Promise<any> {
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
        isDelete: false
        // 注意：不返回 user_password 字段
      }
    });

    return user;
  }

  async findOneByEmail(email: string): Promise<any> {
    return this.prisma.user.findUnique({
      where: {
        user_email: email,
      }
    });
  }

  async deleteUser(userId: number, isDeleted: boolean): Promise<any> {
    return this.prisma.user.update({
      where: {
        user_id: userId
      },
      data: isDeleted,
    });
  }

  async updateUser(userId: number, updateData: any): Promise<any> {
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

  async getUsers(query: GetUserListDto): Promise<any[]> {
    const { name, status, offset, page } = query;
    const pageSize = 10;

    let whereClause = {};

    if (name) {
      whereClause = { ...whereClause, user_name: { contains: name } };
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
    const users = await this.prisma.user.findMany({
      where: whereClause,
      skip: skipAmount,
      take: pageSize,
      select: {
        user_id: true,
        user_name: true,
        user_email: true,
        status: true,
        isadmin: true,
        isDelete: false
      }
    });

    return users;
  }

}
