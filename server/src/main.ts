import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from 'config/swaggerConfig';

// Figured out, about changes in this open commit
// Check Typescript 
// Application throw exception

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  //CORS
  const cors = configService.get<CorsOption>('cors');
  app.enableCors(cors);

  //Swagger || Open Api
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  //PORT
  const PORT = configService.get('port');

  await app.listen(PORT);

  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();

interface CorsOption {
  origin: string;
  methods: string[];
  optionsSuccessStatus: number;
}
