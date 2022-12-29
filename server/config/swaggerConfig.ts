import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
.setTitle('Document Management System - Documanagery')
.setDescription('Web sevice for document management, all your documents in easy way!')
.setVersion('1.0')
.addTag('Documanagery')
.build();