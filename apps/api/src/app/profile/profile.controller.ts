import { Controller, Get, Param, Post, Req, Res, HttpStatus } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { User } from '../database/entities/user.entity';
import { Request, Response } from 'express';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('/me')
  async getCurrentUser() {
    return await this.profileService.getCurrentProfile();
  }

  @Get(':id')
  async getById(@Param() params) {
    const { id } = params;
    return await this.profileService.getUserById(id);
  }

  @Get()
  getAllUsers() {
    return this.profileService.getAllUsers();
  }

  @Post()
  async addNewUser(@Req() req: Request, @Res() res: Response) {
    const user = req.body as User;

    try {
      const newUser = await this.profileService.addNewUser(user);
      res.status(HttpStatus.CREATED).send(newUser);
    } catch (error) {
      res.status(HttpStatus.FORBIDDEN).send(error.sqlMessage);
    }
  }
}
