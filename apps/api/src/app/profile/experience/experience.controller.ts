import { Controller, Param, ParseIntPipe, Patch, Req, UseGuards } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { Request } from 'express';
import { IUserExperience } from '@portfolio/api-interfaces';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  patchExperience(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const experience: Partial<IUserExperience> = req.body;
    return this.experienceService.patchExperience(id, experience);
  }
}
