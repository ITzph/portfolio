import { Controller, Post, Req, UseGuards, Get, Headers } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { PortfolioLoggerService } from '../logger/logger.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AUTH_ENDPOINTS, API_ENDPOINTS } from '@portfolio/api-interfaces';

@Controller(API_ENDPOINTS.auth)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: PortfolioLoggerService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post(AUTH_ENDPOINTS.login)
  async login(@Req() req: Request) {
    this.logger.log('POST auth/login');
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(AUTH_ENDPOINTS.check)
  async checkIfLoggedIn(@Headers() headers) {
    this.logger.log('GET auth/check');
    try {
      const token = headers.authorization.replace(/Bearer /gi, '');
      await this.authService.check(token);
      return true;
    } catch (error) {
      return false;
    }
  }
}
