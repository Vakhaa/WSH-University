import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { StorageFile } from "./storage-file";
import { DownloadResponse, Storage } from "@google-cloud/storage";

@Injectable()
export class FileService {

  private storage: Storage;
  private bucket: string;

  constructor(private configService: ConfigService) {
    this.storage = new Storage({
      projectId: this.configService.get('google.storage.projectId'),
      credentials: {
        client_email: this.configService.get('google.storage.client_email'),
        private_key: this.configService.get('google.storage.private_key'),
      },
    });

    this.bucket = this.configService.get("google.storage.mediaBucket");
  }
  async save( path: string, contentType: string, media: Buffer, metadata: { [key: string]: string }[]) {
    
    const object = metadata.reduce((obj, item) => Object.assign(obj, item), {});
    const file = this.storage.bucket(this.bucket).file(path);
    const stream = file.createWriteStream();
    
    stream.on("finish", async () => {
      return await file.setMetadata({
        metadata: object,
      });
    });
    
    stream.on('error', (error) => {
      console.error('Google Storage (stream error): ', error)
      return error
    });

    stream.end(media);
  }

  delete(path: string) {
    this.storage.bucket(this.bucket).file(path).delete({ ignoreNotFound: true });
  }

  async get(path: string): Promise<StorageFile> { // do i need this crap?

    const fileResponse: DownloadResponse = await this.storage.bucket(this.bucket).file(path).download();
 
    const [buffer] = fileResponse;
    const storageFile = new StorageFile();

    storageFile.buffer = buffer;
    storageFile.metadata = new Map<string, string>();
   
    return storageFile;
  }

  async getWithMetaData(path: string): Promise<StorageFile> {

    const [metadata] = await this.storage.bucket(this.bucket).file(path).getMetadata();

    const fileResponse: DownloadResponse = await this.storage.bucket(this.bucket).file(path).download();
    const [buffer] = fileResponse;
    const storageFile = new StorageFile();

    storageFile.buffer = buffer;
    storageFile.metadata = new Map<string, string>(Object.entries(metadata || {}));
    storageFile.contentType = metadata.contentType;
    return storageFile;
  }

  async getAllFilesName(){
    
    const [files] = await this.storage.bucket(this.bucket).getFiles({prefix:"media/", delimiter:"/"});

    return files.map(file => ({
      name:file.name,
      mediaLink: file.metadata.name,
      contentType: file.metadata.contentType,
      timeCreated: file.metadata.timeCreated,
      updated: file.metadata.updated,
    }));
  }
}
