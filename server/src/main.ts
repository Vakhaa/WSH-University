import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

// git -> google -> file upload
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 
  const configService = app.get(ConfigService);  

  //CORS
  const cors = configService.get<CorsOption>('cors');
  app.enableCors(cors);
  
  //PORT
  const PORT = configService.get('port');

  await app.listen(PORT);
  
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();


interface CorsOption {
  origin: string,
  methods: string[],
  optionsSuccessStatus: number
}