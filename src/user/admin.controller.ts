import { UseGuards, SetMetadata, Controller, Get, Patch, Param, Body, Post, Delete, ParseIntPipe } from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiParam } from "@nestjs/swagger";
import { AttendanceService } from "src/attendance/attendance.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { RolesGuard } from "src/auth/roles.guard";
import { UserService } from "./user.service";
import { UserRole } from "./user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@ApiTags('Admin')
@SetMetadata('roles', [UserRole.ADMIN])
@ApiBearerAuth('JWT')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('admin')
export class AdminController {
    constructor(
        private readonly userService: UserService,
        // private readonly attendanceService: AttendanceService 
    ) { }

    @Post('user')
    create(@Body() body: CreateUserDto) {
        return this.userService.create(body);
    }

    @Get('users')
    findAll() {
        return this.userService.findAll();
    }

    @Patch('update-user/:id')
    update(@Param('id') id: number, @Body() data: UpdateUserDto) {
        return this.userService.update(id, data);
    }
    
    @Delete(':id')
    @ApiParam({ name: 'id', type: Number })
    async remove(@Param('id', ParseIntPipe) id: number) {
        return this.userService.remove(id);
    }
}