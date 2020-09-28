import { Injectable } from '@nestjs/common';
import { ProfileService } from '../profile/profile.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: ProfileService,
    private readonly jwtService: JwtService,
  ) {}

  public async validateUser(username: string, pass: string) {
    const user = await this.usersService.getUserByUsername(username);
    if (!user) {
      return null;
    }
    const isValidPassword = await compare(pass, user?.password);
    if (user && isValidPassword) {
      const { password, ...result } = user;
      return {
        username: result.username,
        userId: result.id,
      };
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
