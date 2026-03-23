import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { ILike, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {

    async findById(id: number): Promise<User | null> {
        return this.userRepo.findOne({ where: { id } });
    }
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
    ) { }

    async create(data: any) {
        const existingUser = await this.userRepo.findOne({
            where: { username: data.username }
        });

        if (existingUser) {
            throw new ConflictException('Username ini sudah digunakan, silakan pilih yang lain.');
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);

        return this.userRepo.save({
            ...data,
            password: hashedPassword,
        });
    }

    findAll() {
        return this.userRepo.find();
    }

    async getAllUser(page: number, limit: number, search?: string, role?: string, title?: string) {
        const whereClause: any = {};

        if (role) whereClause.role = role;
        if (title) whereClause.title = title;

        let finalWhere;

        if (search) {
            finalWhere = [
                { ...whereClause, name: ILike(`%${search}%`) },
                { ...whereClause, email: ILike(`%${search}%`) }
            ];
        } else {
            finalWhere = whereClause;
        }

        const [data, total] = await this.userRepo.findAndCount({
            where: finalWhere,
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                title: true,
                username:true
            },
            take: limit,
            skip: (page - 1) * limit,
            order: {
                name: 'ASC',
            },
        });

        return {
            data,
            meta: {
                totalItems: total,
                itemCount: data.length,
                itemsPerPage: limit,
                totalPages: Math.ceil(total / limit),
                currentPage: page,
            },
        };
    }

    async changePassword(userId: number, oldPass: string, newPass: string) {
        const user = await this.userRepo.findOne({ where: { id: userId } });
        if (!user) throw new NotFoundException('User not found');

        const isValid = await bcrypt.compare(oldPass, user.password);
        if (!isValid) throw new BadRequestException('Old password incorrect');

        user.password = await bcrypt.hash(newPass, 10);
        return this.userRepo.save(user);
    }

    async remove(id: number) {
        const user = await this.userRepo.findOne({ where: { id } });
        if (!user) throw new NotFoundException('Data user tidak ditemukan');
        await this.userRepo.remove(user);
        return { message: ` ${user.name} berhasil dihapus` };
    }

    async update(id: number, dto: UpdateUserDto) {
        const user = await this.userRepo.findOne({ where: { id } });
        if (!user) throw new NotFoundException('User tidak ditemukan');

        if (dto.password) {
            const salt = await bcrypt.genSalt();
            dto.password = await bcrypt.hash(dto.password, salt);
        }

        Object.assign(user, dto);

        return await this.userRepo.save(user);
    }
}
