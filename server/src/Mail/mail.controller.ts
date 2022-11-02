import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('email')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('/send-test')
  async sendTest(@Body() mail: mailDto): Promise<void> {
    return this.mailService.sendTestMail(mail.to);
  }

  @Post('/send')
  async sendMail(@Body() mail: mailDto): Promise<void> {
    return this.mailService.sendMail(mail.to, mail.message);
  }
}

interface mailDto {
  to: string;
  message: string;
}
