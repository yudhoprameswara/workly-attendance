import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Attendance } from './attendance.entity';
import * as fs from 'fs';
import { allAttendanceDto } from './dto/allAttendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { join } from 'path';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private repo: Repository<Attendance>,
  ) { }

  async checkIn(
    userId: number,
    photo: string,
    latitude?: number,
    longitude?: number,
    ip?: string,
    device?: string,
  ) {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const existing = await this.repo.findOne({
      where: {
        user_id: userId,
        check_in_time: Between(start, end),
      },
    });

    if (existing) {
      if (photo) fs.unlink(`uploads/${photo}`, () => { });
      throw new BadRequestException('Already check-in today');
    }

    const attendance = this.repo.create({
      user_id: userId,
      check_in_time: new Date(),
      photo_url: photo,
      location_in: latitude && longitude ? `${latitude},${longitude}` : null,
      location_out: null,
      ip_address: ip,
      device_info: device,
    });

    return this.repo.save(attendance);
  }
  async checkOut(
    userId: number,
    photo?: string,
    latitude?: number,
    longitude?: number,
    ip?: string,
    device?: string,
  ) {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const attendance = await this.repo.findOne({
      where: {
        user_id: userId,
        check_in_time: Between(start, end),
      },
    });

    if (!attendance) {
      throw new BadRequestException('No check-in today');
    }

    if (attendance.check_out_time) {
      throw new BadRequestException('Already check-out');
    }

    attendance.check_out_time = new Date();

    if (photo) attendance.photo_url_out = photo;
    if (ip) attendance.ip_address_out = ip;
    if (device) attendance.device_info_out = device;
    if (longitude && latitude) attendance.location_out = `${latitude},${longitude}`

    return this.repo.save(attendance);
  }

  async getMyAttendance(userId: number) {
    return this.repo.find({
      where: { user_id: userId },
      order: { check_in_time: 'DESC' },
    });
  }

  async getTodayAttendance(userId: number) {
    const today = new Date();

    const startOfDay = new Date(today.setHours(0, 0, 0, 0));

    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    return this.repo.findOne({
      where: {
        user_id: userId,
        check_in_time: Between(startOfDay, endOfDay)
      },
      order: { check_in_time: 'DESC' },
    });
  }

  async getOneAttendace(id: number) {
    const attendance = await this.repo.findOne({ where: { id } });

    if (!attendance) {
      throw new NotFoundException(`Data absensi #${id} tidak ditemukan`);
    }

    const convertToBase64 = (filename: string) => {
      if (!filename) return null;
      const filePath = join(process.cwd(), 'uploads', filename);

      if (fs.existsSync(filePath)) {
        const fileBuffer = fs.readFileSync(filePath);
        return `data:image/jpeg;base64,${fileBuffer.toString('base64')}`;
      }
      return null;
    };

    return {
      ...attendance,
      photo_url: convertToBase64(attendance.photo_url),
      photo_url_out: convertToBase64(attendance.photo_url_out),
    };
  }

  async getAll(query: allAttendanceDto) {
    const { search, startDate, endDate, page = 1, limit = 10 } = query;
    const skip = (page! - 1) * limit!;

    const qb = this.repo.createQueryBuilder('attendance')
      .leftJoin('attendance.user', 'user')
      .addSelect([
        'attendance',
        'user.id',
        'user.name',
        'user.email',
        'user.role'
      ])
      .orderBy('attendance.check_in_time', 'DESC');

    if (search) {
      qb.andWhere('user.name LIKE :search', { search: `%${search}%` });
    }

    if (startDate && endDate) {
      qb.andWhere('attendance.check_in_time BETWEEN :start AND :end', {
        start: `${startDate} 00:00:00`,
        end: `${endDate} 23:59:59`,
      });
    }

    const [data, total] = await qb
      .take(limit)
      .skip(skip)
      .getManyAndCount();

    return {
      data,
      meta: {
        total,
        page,
        last_page: Math.ceil(total / limit),
      },
    };
  }

  async update(id: number, dto: UpdateAttendanceDto) {
    const attendance = await this.repo.findOne({ where: { id } });
    if (!attendance) throw new NotFoundException('Data absensi tidak ditemukan');
    Object.assign(attendance, dto);
    return await this.repo.save(attendance);
  }

  async remove(id: number) {
    const attendance = await this.repo.findOne({ where: { id } });
    if (!attendance) throw new NotFoundException('Data absensi tidak ditemukan');

    const uploadDir = join(process.cwd(), 'uploads');

    const deleteFile = async (fileName: string | null) => {
      if (fileName) {
        const filePath = join(uploadDir, fileName);
        try {
          fs.unlinkSync(filePath);
        } catch (err) {
          console.error(`Gagal menghapus file: ${filePath}`, err.message);
        }
      }
    };

    await deleteFile(attendance.photo_url);
    await deleteFile(attendance.photo_url_out);
    await this.repo.remove(attendance);
    return { message: `Absensi ID ${id} berhasil dihapus` };
  }
}