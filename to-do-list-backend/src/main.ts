import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//import { CorsModule } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3001);
  
}
bootstrap();
