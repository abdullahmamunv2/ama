import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {NestFastifyApplication} from '@nestjs/platform-fastify'
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');
  const prefix = configService.get<string>('API_PREFIX');
  app.setGlobalPrefix(prefix);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(3000,()=>{
    console.log(`Server listening on port ${port}.`)
  });
}
bootstrap();
