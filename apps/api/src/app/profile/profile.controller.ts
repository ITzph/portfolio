import { Controller, Get, Param, Post, Req, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { User } from '../database/entities/user.entity';
import { Request, Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PortfolioLoggerService } from '../logger/logger.service';

@Controller('profiles')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
    private readonly logger: PortfolioLoggerService,
  ) {}

  @Get('/me')
  async getCurrentUser() {
    this.logger.log('GET profiles/me');
    return await this.profileService.getCurrentProfile();
  }

  @Get(':id')
  async getById(@Param() params) {
    const { id } = params;
    this.logger.log('GET profiles/:idk');
    return await this.profileService.getUserById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllUsers() {
    this.logger.log('GET profiles');
    return this.profileService.getAllUsers();
  }

  @Post()
  async addNewUser(@Req() req: Request, @Res() res: Response) {
    this.logger.log('POST profiles');
    const user = req.body as User;

    try {
      const newUser = await this.profileService.addNewUser(user);
      res.status(HttpStatus.CREATED).send(newUser);
    } catch (error) {
      res.status(HttpStatus.FORBIDDEN).send(error.sqlMessage);
    }
  }
}
