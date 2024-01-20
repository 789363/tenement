import { Controller, Post, Get, Delete, Put, Body, Param, UseGuards, UseInterceptors, Query, Request, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../auth/admin.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseInterceptor } from './response.interceptor';
import { GetUserListDto } from './dto/get-userlist.dto';
@ApiTags('users')
@Controller('users')
@UseInterceptors(ResponseInterceptor)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) { }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ description: 'User Registration Data', type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'User successfully registered.' })
  @ApiResponse({ status: 403, description: 'User already register' })
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiBody({ description: 'User Login Data', type: LoginDto })
  @ApiResponse({ status: 200, description: 'User successfully logged in.' })
  @ApiResponse({ status: 404, description: 'User not exist' })
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.user_email, loginDto.user_password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Delete(':user_id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiParam({ name: 'user_id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User successfully deleted.' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async deleteUser(@Param('user_id', ParseIntPipe) userId: number) {
    return this.usersService.deleteUser(userId);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Put(':user_id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiParam({ name: 'user_id', description: 'User ID' })
  @ApiBody({ description: 'User Update Data', type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'User successfully updated.' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async updateUser(@Param('user_id', ParseIntPipe) userId: number, @Body() updateData: UpdateUserDto) {
    return this.usersService.updateUser(userId, updateData);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Get()
  @ApiOperation({ summary: 'Get user list' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved user data' })
  async getUsers(@Request() req) {
    const userRole = req.userRole;

    if (userRole === 'admin') {
      // 如果用户是管理员，返回所有用户数据
      return this.usersService.getUsers();
    } else if (userRole === 'regular') {
      // 如果用户是普通用户，仅返回该用户的数据
      return this.usersService.getUserById(req.user.user_id);
    } else {
      // 如果用户既不是管理员也不是普通用户，抛出异常
      throw new Error('Access Denied');
    }
  }


  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Get(':user_id')
  @ApiOperation({ summary: 'Get user details' })
  @ApiParam({ name: 'user_id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved user details' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getUserById(@Param('user_id', ParseIntPipe) userId: number) {
    return this.usersService.getUserById(userId);
  }
}
