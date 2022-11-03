import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import { Express } from 'express'

@Injectable()
export class FileService {
  constructor(private configService: ConfigService) {}

  async uploadFile(file: Express.Multer.File) {
     
    console.log(file);
  }

  async getAllFilesName(){
   return  fs.readdirSync('../upload/');
  }

}
