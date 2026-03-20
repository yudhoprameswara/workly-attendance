import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'yudho1' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: '123' })
  @IsNotEmpty()
  password: string;
}