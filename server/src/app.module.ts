import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailModule } from './Mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { FileModule } from './File/file.module';
import configuration from 'config/configuration';

@Module({
  imports: [
    MailModule, 
    ConfigModule.forRoot({ load: [configuration] }),
    FileModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
