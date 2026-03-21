import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsDate } from 'class-validator';

export class UpdateAttendanceDto {
@ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  check_in_time?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  check_out_time?: Date;
}