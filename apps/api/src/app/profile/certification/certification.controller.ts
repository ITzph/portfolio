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
import { IUserCertification, PORTFOLIO_ENDPOINTS } from '@portfolio/api-interfaces';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

import { Request, Response } from 'express';
import { CertificationService } from './certification.service';

@Controller(PORTFOLIO_ENDPOINTS.certifications)
export class CertificationController {
  constructor(private readonly certificationService: CertificationService) {}

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  patchExperience(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const certification: Partial<IUserCertification> = req.body;
    return this.certificationService.patchCertification(id, certification);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteCertification(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const result = await this.certificationService.deleteCertification(id);

    if (result.affected) {
      return res.send({ id });
    } else {
      res.status(HttpStatus.NOT_FOUND).send({ message: 'Experience to delete not found!' });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id')
  async addNewCertification(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const certification = req.body as IUserCertification;

    const result = await this.certificationService.addCertification({
      ...certification,
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
