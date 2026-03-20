import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
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
        const hashedPassword = await bcrypt.hash(data.password, 10);

        return this.userRepo.save({
            ...data,
            password: hashedPassword,
        });
    }

    findAll() {
        return this.userRepo.find();
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
