import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { AdminController } from './admin.controller';
import { RolesGuard } from 'src/auth/roles.guard';

@Module({
  imports: [TypeOrmModule.forFeature([User]), 
  ],
providers: [
    UserService, 
    JwtStrategy, 
    RolesGuard   
  ],
  controllers: [UserController,AdminController],
  exports: [UserService],
})
export class UserModule {}
