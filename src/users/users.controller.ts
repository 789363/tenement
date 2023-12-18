import { Controller, Post, Get, Delete, Put, Body, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: any) {
    return this.usersService.createUser(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: any) {
    const user = await this.authService.validateUser(loginDto.user_email, loginDto.user_password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteUser(@Param('id') userId: number) {
    return this.usersService.deleteUser(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async updateUser(@Param('id') userId: number, @Body() updateData: any) {
    return this.usersService.updateUser(userId, updateData);
  }
}
