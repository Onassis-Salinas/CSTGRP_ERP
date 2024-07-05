import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationFilter } from './interceptors/validation/validation.filter';
import fastifyCookie from '@fastify/cookie';
import multipart from 'fastify-multipart';
import { DBFilter } from './interceptors/db/db.filter';
import dotenv from 'dotenv';
import fastifyStatic from '@fastify/static';
import { join } from 'path';
import sql from './utils/db';

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  //Protection
  app.enableCors({
    origin: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Disposition'],
    credentials: true,
  });
  app.useGlobalFilters(new ValidationFilter());
  app.useGlobalFilters(new DBFilter());

  //middleware
  await app.register(fastifyCookie);
  await app.register(multipart);
  app.register(fastifyStatic, {
    root: join(__dirname, '..', 'src', 'public'),
    prefix: '/recursos/',
  });

  //Swagger implementation
  const config = new DocumentBuilder()
    .setTitle('Docs')
    .setDescription('Cstgrp Api documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await sql`ALTER ROLE postgres SET search_path TO cim, public;`;

  await app.listen(process.env.PORT || 3000, '0.0.0.0');
}
bootstrap();
