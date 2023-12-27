import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
    @ApiProperty({ example: 'John Doe', description: 'User\'s name', required: false })
    user_name?: string;

    @ApiProperty({ example: 'john@example.com', description: 'User\'s email', required: false })
    user_email?: string;

}
