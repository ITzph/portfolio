import {
  Controller,
  Delete,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { IUserSkill } from '@portfolio/api-interfaces';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { SkillService } from './skill.service';
import { Request, Response } from 'express';

@Controller('skill')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  patchExperience(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const skill: Partial<IUserSkill> = req.body;
    return this.skillService.patchSkill(id, skill);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteSkill(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const result = await this.skillService.deleteSkill(id);

    if (result.affected) {
      return res.send({ id });
    } else {
      res.status(HttpStatus.NOT_FOUND).send({ message: 'Skill to delete not found!' });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id')
  async addExperienc(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const skill: IUserSkill = req.body;

    const result = await this.skillService.addSkill({
      ...skill,
      user: {
        id,
      },
    } as any);

    if (result) {
      return res.status(HttpStatus.CREATED).send(result);
    } else {
      return res.status(HttpStatus.METHOD_NOT_ALLOWED).send({
        message: 'Some error occurred',
      });
    }
  }
}
