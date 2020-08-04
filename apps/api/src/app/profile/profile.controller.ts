import { Controller, Get, Param } from '@nestjs/common';
import { ProfileService } from './profile.service';

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
}
