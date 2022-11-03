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

  getAllFilesName(){
   return  fs.readdirSync('../upload/');
  }

  deleteStaticFile(filepath: string){
    try{
      fs.rmSync(filepath);
      return true;
    }catch(error){
      return false;
    }
  }

}
