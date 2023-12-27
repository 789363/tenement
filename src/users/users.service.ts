import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async createUser(createUserDto: { user_name: string; user_email: string; user_password: string; isadmin: boolean }): Promise<any> {
    const hashedPassword = await bcrypt.hash(createUserDto.user_password, 10);
    const user = await this.prisma.user.create({
      data: {
        user_name: createUserDto.user_name,
        user_email: createUserDto.user_email,
        user_password: hashedPassword,
        status: true, // 根据业务逻辑设置默认状态
        isadmin: createUserDto.isadmin, // 使用传入的值
      },
      select: {
        user_id: true,
        user_name: true,
        user_email: true,
        status: true,
        isadmin: true,
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

  async deleteUser(userId: number): Promise<any> {
    return this.prisma.user.delete({
      where: {
        user_id: userId // 使用传入的整数类型参数
      }
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
}
