import { Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { ContactMeDetails } from '@portfolio/api-interfaces';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  async sendEmail(@Req() req: Request) {
    const body = req.body as ContactMeDetails;

    this.emailService.contactMe(body);
  }
}
