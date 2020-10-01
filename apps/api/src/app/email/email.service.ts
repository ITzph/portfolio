import { Injectable } from '@nestjs/common';
import { ContactMeDetails } from '@portfolio/api-interfaces';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    // create reusable transporter object using the default SMTP transport
    this.transporter = nodemailer.createTransport({
      secure: true,
      service: 'Gmail',
      host: 'smtp.gmail.com',
      port: 465,
      auth: {
        user: process.env.MailUsername,
        pass: process.env.MailPassword,
      },
    });
  }
  async contactMe({ email, firstName, lastName, message }: ContactMeDetails) {
    // send mail with defined transport object
    const info = await this.transporter.sendMail({
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
