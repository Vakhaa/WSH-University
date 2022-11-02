import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as mailer from 'nodemailer';
import inlineBase64 from 'nodemailer-plugin-inline-base64';
import MailAuth from './MailAuth';

@Injectable()
export class MailService {
  constructor(private configService: ConfigService) {}

  async sendTestMail(email: string): Promise<void> {
    const smtpTransport = mailer.createTransport({
      service: 'Gmail',
      auth: this.configService.get<MailAuth>('mail.auth'),
    });

    // const mail = getEmailData(to, data, type);
    // send mail with defined transport object
    let mail = {
      from: '"Fred Foo 👻" <denys.vynohradnyi.dev@gmail.com> ', // sender address
      to: email, // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Sus?', // plain text body
      html: '<b>Hello world?</b>', // html body
    };

    // smtpTransport.use('compile', inlineBase64({ cidPrefix: 'somePrefix_' }));
    smtpTransport.sendMail(mail, function (error, response) {
      if (error) console.log(error);
      smtpTransport.close();
    });
  }

  async sendMail(email: string, message: string): Promise<void> {
    const smtpTransport = mailer.createTransport({
      service: 'Gmail',
      auth: this.configService.get<MailAuth>('mail.auth'),
    });
    let mail = {
      from: '"Fred Foo 👻" <denys.vynohradnyi.dev@gmail.com> ', // sender address
      to: email, // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Sus?', // plain text body
      html: '<b>' + message + '</b>', // html body
    };

    smtpTransport.sendMail(mail, function (error, response) {
      if (error) console.log(error);
      smtpTransport.close();
    });
  }
}
