import { Injectable } from '@nestjs/common';
import { ProfileService } from '../profile/profile.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: ProfileService,
    private readonly jwtService: JwtService,
  ) {}

  public async validateUser(username: string, pass: string) {
    // if (username === 'carlo' && password === '12345678') {
    //   return {
    //     token: 'randomToken',
    //     userId: 1,
    //     username,
    //   };
    // } else {
    //   return null;
    // }
    const user = await this.usersService.getUserByUsername(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return {
        username: result.username,
        userId: result.id,
        token: 'asdfasdfsa',
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
