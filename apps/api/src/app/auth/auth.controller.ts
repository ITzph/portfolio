import { Controller, Post, Req, Res, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Req() req: Request, @Res() res: Response) {
    const { username, password } = req.body;
    const user = await this.authService.validate(username, password);

    if (user) {
      return res.status(HttpStatus.ACCEPTED).send(user);
    } else {
      return res.status(HttpStatus.UNAUTHORIZED).send({ message: 'Invalid Credentials' });
    }
  }
}
