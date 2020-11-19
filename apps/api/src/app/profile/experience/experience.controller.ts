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
import { ExperienceService } from './experience.service';
import { Request, Response } from 'express';
import { IUserExperience, API_ENDPOINTS } from '@portfolio/api-interfaces';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller(API_ENDPOINTS.experiences)
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  patchExperience(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const experience: Partial<IUserExperience> = req.body;
    return this.experienceService.patchExperience(id, experience);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteExperience(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const result = await this.experienceService.deleteExperience(id);

    if (result.affected) {
      return res.send({ id });
    } else {
      res.status(HttpStatus.NOT_FOUND).send({ message: 'Experience to delete not found!' });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id')
  async addNewExperience(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const experience = req.body as IUserExperience;

    const result = await this.experienceService.addExperience({
      ...experience,
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
