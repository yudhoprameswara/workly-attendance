import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength } from "class-validator";
export class ChangePasswordDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Password lama tidak boleh kosong' })
  @IsString()
  oldPassword: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Password baru tidak boleh kosong' })
  @IsString()
  newPassword: string;
}