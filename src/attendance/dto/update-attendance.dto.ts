import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateAttendanceDto {
  @ApiPropertyOptional()
  check_in_time?: Date;

  @ApiPropertyOptional()
  check_out_time?: Date;

}