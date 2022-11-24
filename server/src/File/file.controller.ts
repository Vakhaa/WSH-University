import { Controller, Delete, Get, Param, Post, Res, 
  UploadedFile, UseInterceptors,
  NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { FileService } from "./file.service";
import { FileInterceptor } from '@nestjs/platform-express';
//for type
import { StorageFile } from "./storage-file";
import { Express } from 'express'
import type { Response } from 'express';


export const randomName = () => {
  return Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
};

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get('all_names')
  async getAllFilesName() {
    return this.fileService.getAllFilesName();
  }

  @Get("/:name")
  async downloadMedia(@Param("name") name: string, @Res() res: Response) {
    let storageFile: StorageFile;

    try {
      storageFile = await this.fileService.getWithMetaData("media/" + name);
    } catch (e) {
    
      if (e.message.toString().includes("No such object")) { 
        throw new NotFoundException("image not found");
      } else {
        throw new ServiceUnavailableException("internal error");
      }
    }
    res.setHeader("Content-Type", storageFile.contentType);
    res.setHeader("Cache-Control", "max-age=60d");
    res.end(storageFile.buffer);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor("file", {
      limits: {
        files: 1,
        // fileSize: 1024 * 1024,
      },
    })
  )
  async uploadMedia( @UploadedFile() file: Express.Multer.File) {

    await this.fileService.save(
      "media/" + file.originalname,
      file.mimetype,
      file.buffer,
      [{ mediaId:  file.originalname}]
    );
  }

  @Delete(':path') // must be another, better way 
  async deleteFile(@Param("path") path:string, @Res() res: Response){

    this.fileService.delete("media/"+ path);
    res.sendStatus(200);
  }

}
