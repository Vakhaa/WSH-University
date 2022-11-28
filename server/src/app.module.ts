import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailModule } from './Mail/mail.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FileModule } from './File/file.module';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from 'config/configuration';
import { UserModule } from './User/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.mongo.uri'),
      }),
      inject: [ConfigService],
    }),
    UserModule,
    MailModule, 
    FileModule,  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
