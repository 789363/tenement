import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { GetUserListDto } from './dto/get-userlist.dto';
import { User } from '@prisma/client';
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
        isAdmin: createUserDto.isadmin, // 使用传入的值
        isDeleted: createUserDto.isDelete
      },
      select: {
        user_id: true,
        user_name: true,
        user_email: true,
        status: true,
        isAdmin: true,
        isDeleted: true,
        user_password: false,
        // 注意：不返回 user_password 字段
      }
    });

    return {
      ...user,
      isadmin: user.isAdmin,
      isDelete: user.isDeleted
    };
  }

  async findOneByEmail(email: string): Promise<User> {
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

  async updateUser(userId: number, updateData: any): Promise<User> {
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

  async deleteUser(userId: number): Promise<User> {
    return this.prisma.user.update({
      where: {
        user_id: userId
      },
      data: {
        isDeleted: true,
      },
    });
  }

  async getUsers(): Promise<GetUserListDto[]> {
    return this.prisma.user.findMany({
      where: {
        isDeleted: false,
      },
      select: {
        user_id: true,
        user_name: true,
        user_email: true,
        status: true,
        isAdmin: true,
        isDeleted: true,
      },
    });
  }

  async getUserById(userId: number): Promise<GetUserListDto> {
    const user = await this.prisma.user.findUnique({
      where: {
        user_id: userId,
      },
      select: {
        user_id: true,
        user_name: true,
        user_email: true,
        status: true,
        isAdmin: true,
        isDeleted: true,
      }
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }


}


