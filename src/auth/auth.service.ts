import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
   @Inject(forwardRef(() => UserService))
   private userService : UserService,
   private jwtService: JwtService,
  ) {}

  async login(data: any) {
    const users = await this.userService.findAll();
    const user = users.find(u => u.username === data.username);

    if (!user) throw new UnauthorizedException('User not found');

    const isMatch = await bcrypt.compare(data.password, user.password);

    if (!isMatch) throw new UnauthorizedException('Wrong password');

    const token = this.jwtService.sign({
      userId: user.id,
      username: user.username,
      role: user.role,
      title: user.title
    });
    return {
      access_token: token,
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
        title: user.title
      }
    };
  }
}