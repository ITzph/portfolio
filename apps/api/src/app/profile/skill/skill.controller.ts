import { Controller, Param, ParseIntPipe, Patch, Req, UseGuards } from '@nestjs/common';
import { IUserSkill } from '@portfolio/api-interfaces';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { SkillService } from './skill.service';
import { Request } from 'express';

@Controller('skill')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  patchExperience(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const skill: Partial<IUserSkill> = req.body;
    return this.skillService.patchSkill(id, skill);
  }
}
