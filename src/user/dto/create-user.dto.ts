import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Jon Doe' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'jondoe' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: 'email@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ApiProperty({ example: 'employee' })
  @IsOptional()
  @IsString()
  role?: string;

  @ApiProperty({ example: 'Employee' })
  @IsOptional()
  @IsString()
  title?: string;
}