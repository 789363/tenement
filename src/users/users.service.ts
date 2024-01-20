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

  async deleteUser(userId: number): Promise<user> {
    return this.prisma.user.update({
      where: {
        user_id: userId
      },
      data: {
        isDelete: true,
      },
    });
  }

  async getUsers(): Promise<UserData[]> {
    return this.prisma.user.findMany({
      where: {
        isDelete: false,
      },
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


