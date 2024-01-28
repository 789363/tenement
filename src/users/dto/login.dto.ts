import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'john@example.com', description: "User's email" })
  user_email: string;

  @ApiProperty({ example: 'password123', description: "User's password" })
  user_password: string;
}
