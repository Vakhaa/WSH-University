import { Headers, Delete, Get, Param, Post, Res, 
  Controller, UploadedFile, UseInterceptors,
  NotFoundException, ServiceUnavailableException, Body } from '@nestjs/common';
import { FileService } from "./file.service";
import { FileInterceptor } from '@nestjs/platform-express';
//for type
import { StorageFile } from "./storage-file";
import { Express } from 'express'
import type { Response } from 'express';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get('all_names')
  async getAllFilesName(@Headers("userId") userId: string) {
    return this.fileService.getAllFilesName(userId);
  }

  @Get("/:filename")
  async downloadMedia(@Param("filename") filename: string, @Headers("path") path: string, @Res() res: Response) {
    let storageFile: StorageFile;

    try {
      storageFile = await this.fileService.getWithMetaData(path+filename);
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

  @Post("folder")
  async createFolder(@Body("path") path: string,  @Res() res: Response) {
    
    await this.fileService.createFolder(path);

    res.sendStatus(204);
  }

  @Get("meta/:fileName")
  async downloadMetadata(@Param("fileName") filename: string, @Headers("path") path:string, @Headers("isfolder") isfolder:string, @Res() res: Response) {
    
    const result = await this.fileService.getFileMetadata(path + filename+ (isfolder? "/":""));

    res.send(result);
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
  async uploadMedia( @UploadedFile() file: Express.Multer.File , @Headers("path") path:string, @Res() res: Response) {

    // const fileName = "media/" +userId+"/"+ file.originalname;
    await this.fileService.saveFile(
      path+file.originalname,
      file.mimetype,
      file.buffer,
      [{ mediaId:  file.originalname}]
    );

    res.sendStatus(201);
  }

  @Delete(':filename') // must be another, better way 
  async deleteFile(@Param("filename") filename:string, @Headers("path") path:string, @Res() res: Response){

    await this.fileService.delete(path+filename);
    res.sendStatus(200);
  }

}

