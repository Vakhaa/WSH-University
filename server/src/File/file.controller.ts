import { Controller, Delete, Get, Param, Post, Res, StreamableFile, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { Express } from 'express'
import { diskStorage } from 'multer';
import { extname, join} from 'path';

//fro type
import type { Response } from 'express';
import { createReadStream } from 'fs';

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  // there we crate random additional to our file
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  
  @Post('upload')
  @UseInterceptors(FileInterceptor('file',
    {
      storage: diskStorage({
        destination: '../upload',
        filename: editFileName,
      })
    } 
  ))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    //we need to check that this file already exists or not.
    // before we save, but we need do it in pipeline. Maybe in module.
    return {
      name: file.filename,
    }
  }

  @Get('all_names')
  getAllFilesName() {
    return this.fileService.getAllFilesName();
  }

  @Get(':name')
  getStaticFile(@Param() params, @Res({ passthrough: true }) res: Response): StreamableFile {
    
    const filepath = join(process.cwd()+"\\..\\upload", params.name);

    res.attachment(filepath);
  
    const file = createReadStream(filepath);

    return new StreamableFile(file);
  }

  @Delete(':name')
  deleteStaticFile(@Param() params){
    const filepath = join(process.cwd()+"\\..\\upload", params.name);
    const isDelete = this.fileService.deleteStaticFile(filepath);

    return {isDelete: isDelete};
  }

}
