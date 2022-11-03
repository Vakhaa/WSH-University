import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { FileController } from './file.controller';
import { FileService } from './file.service';

@Module({
  imports: [
    ConfigModule,
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: '../upload',
      }),
      
    })],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
