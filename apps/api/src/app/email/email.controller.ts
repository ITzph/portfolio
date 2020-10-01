import { Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import * as nodemailer from 'nodemailer';
import { ContactMeDetails } from '@portfolio/api-interfaces';

@Controller('email')
export class EmailController {
  @Post()
  async sendEmail(@Req() req: Request) {
    const { email, message, firstName, lastName } = req.body as ContactMeDetails;

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      secure: true,
      service: 'Gmail',
      host: 'smtp.gmail.com',
      port: 465,
      auth: {
        user: process.env.MailUsername,
        pass: process.env.MailPassword,
      },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: `"${firstName} ${lastName}" <${process.env.MailUsername}>`, // sender address
      to: process.env.MailUsername, // list of receivers
      subject: `Hello from ${firstName} ${lastName}`, // Subject line
      html: `<div>
      <p>Hi Boss,<p>
      <p>You received a message from <b>${firstName} ${lastName}</b>, <b><i>${email}</i></b>.</p>
        <div style="margin-left: 10px; font-style: italic;">
          <p style="white-space: pre-wrap;">&quot;${message}&quot;</p>
        </div>
      <p>Best Regards,</p>
      <p>Code Gino</p>
      </div>`,
    });
  }
}
