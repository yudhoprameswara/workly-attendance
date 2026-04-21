import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    Req,
    Res,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AttendanceService } from './attendance.service';
import { allAttendanceDto } from './dto/allAttendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import * as e from 'express';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT')
@Controller('attendance')
export class AttendanceController {
    constructor(private readonly attendanceService: AttendanceService) { }

    @Post('check-in')
    @UseInterceptors(FileInterceptor('photo'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                photo: { type: 'string', format: 'binary' },
                latitude: { type: 'number' },
                longitude: { type: 'number' },
            },
            required: ['photo'],
        },
    })
    checkIn(
        @UploadedFile() file: Express.Multer.File,
        @Req() req,
        @Body() dto: any,
    ) {
        if (!file) throw new BadRequestException('Photo is required');

        let ip = req.headers['x-forwarded-for']?.toString().split(',')[0] ||
            req.connection?.remoteAddress ||
            req.socket?.remoteAddress ||
            req.ip;

        if (ip?.startsWith('::ffff:')) {
            ip = ip.replace('::ffff:', '');
        }
        const device = req.headers['user-agent'];

        const latitude = dto.latitude ? parseFloat(dto.latitude) : null;
        const longitude = dto.longitude ? parseFloat(dto.longitude) : null;

        try {
            return this.attendanceService.checkIn(
                req.user.id,
                file.filename,
                latitude!,
                longitude!,
                ip,
                device,
            );

        } catch (error) {
            throw error
        }
    }

    @Post('check-out')
    @UseInterceptors(FileInterceptor('photo'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                photo: { type: 'string', format: 'binary' },
                latitude: { type: 'number' },
                longitude: { type: 'number' },
            },
            required: ['photo'],
        },
    })
    async checkOut(
        @UploadedFile() file: Express.Multer.File,
        @Req() req,
        @Body() dto: any,
    ) {
        if (!file) throw new BadRequestException('Photo is required for check-out');

        let ip = req.headers['x-forwarded-for']?.toString().split(',')[0] ||
            req.connection?.remoteAddress ||
            req.socket?.remoteAddress ||
            req.ip;

        if (ip?.startsWith('::ffff:')) {
            ip = ip.replace('::ffff:', '');
        }

        const device = req.headers['user-agent'];

        // Parse coordinates properly - they might come as strings from formdata
        const latitude = dto.latitude ? parseFloat(dto.latitude) : null;
        const longitude = dto.longitude ? parseFloat(dto.longitude) : null;

        try {
            return await this.attendanceService.checkOut(
                req.user.id,
                file.filename,
                latitude!,
                longitude!,
                ip,
                device,
            );
        } catch (error) {
            throw error;
        }
    }

    @Get('all-attendance')
    allAttendance(@Query() query: allAttendanceDto) {
        return this.attendanceService.getAll(query)
    }

    @Patch(':id')
    @ApiParam({ name: 'id', type: Number })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateAttendanceDto
    ) {
        return this.attendanceService.update(id, dto);
    }

    @Delete(':id')
    @ApiParam({ name: 'id', type: Number })
    async remove(@Param('id', ParseIntPipe) id: number) {
        return this.attendanceService.remove(id);
    }

    @Get(':id')
    @ApiParam({ name: 'id', type: Number })
    async getByid(@Param('id', ParseIntPipe) id: number) {
        return this.attendanceService.getOneAttendace(id);
    }

    @Get('user/:id')
    @ApiParam({ name: 'id', type: Number })
    async getUserAttendance(@Param('id', ParseIntPipe) id: number) {
        return this.attendanceService.getMyAttendance(id);
    }

    @Get('user-today/:id')
    @ApiParam({ name: 'id', type: Number })
    async getUserTodayAttendance(@Param('id', ParseIntPipe) id: number) {
        return this.attendanceService.getTodayAttendance(id);
    }
}