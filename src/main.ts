import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  /* app.useGlobalInterceptors(
  new TransformInterceptor(),
  );*/
  const port = 3000;
  await app.listen(port);
  logger.log(`Aplicação disponível na porta ${port}`);
}

bootstrap();
