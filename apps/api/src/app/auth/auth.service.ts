import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  public validate(username: string, password: string) {
    if (username === 'carlo' && password === '12345678') {
      return {
        token: 'randomToken',
        userId: 1,
        username,
      };
    } else {
      return null;
    }
  }
}
