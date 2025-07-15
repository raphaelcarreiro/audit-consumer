import { NestFactory } from '@nestjs/core';
import { AppModule } from './nestjs/app.module';
import { connectMicroservice } from './nestjs/microservice';
import { applyGlobalResources } from './nestjs/global-resources';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: process.env.NODE_ENV === 'production' ? console : undefined,
  });

  applyGlobalResources(app);

  connectMicroservice(app);

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
