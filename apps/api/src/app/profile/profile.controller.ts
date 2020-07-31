import { Controller, Get } from '@nestjs/common';
import { ProfileService } from './profile.service';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('/me')
  getCurrentUser() {
    return this.profileService.getCurrentProfile();
  }
}
