import { Controller, Param, ParseIntPipe, Patch, Req } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { Request } from 'express';
import { IUserExperience } from '@portfolio/api-interfaces';

@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @Patch(':id')
  patchExperience(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const experience: Partial<IUserExperience> = req.body;
    return this.experienceService.patchExperience(id, experience);
  }
}
