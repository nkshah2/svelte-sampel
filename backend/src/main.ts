import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { getAllCORSHeaders } from 'supertokens-node';
import { AppModule } from './app.module';
import { SuperTokenExceptionFilter } from './auth/auth.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    // origin: /rcracecontrol\.com$/,
    origin: ['http://localhost:8080'],
    allowedHeaders: ['content-type', ...getAllCORSHeaders()],
    credentials: true,
  });
  app.useGlobalFilters(new SuperTokenExceptionFilter());

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(3000);
}
bootstrap();
