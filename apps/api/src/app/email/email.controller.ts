import { Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ContactMeDetails } from '@portfolio/api-interfaces';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  async sendEmail(@Req() req: Request, @Res() res: Response<{ message: string; result: boolean }>) {
    const body = req.body as ContactMeDetails;

    try {
      this.emailService.contactMe(body);
      return res
        .status(HttpStatus.CREATED)
        .send({ result: true, message: 'Successfully sent email' });
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send({ result: false, message: 'There is an error' });
    }
  }
}
