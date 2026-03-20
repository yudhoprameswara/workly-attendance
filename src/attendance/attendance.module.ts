import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from './attendance.entity';
import { MulterModule } from '@nestjs/platform-express/multer/multer.module';
import { diskStorage } from 'multer';

@Module({
  imports: [TypeOrmModule.forFeature([Attendance]),
  MulterModule.register({
     storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename = Date.now() + '-' + file.originalname;
          cb(null, filename);
        },
      }),
  }),],
  providers: [AttendanceService],
  controllers: [AttendanceController]
})
export class AttendanceModule { }
