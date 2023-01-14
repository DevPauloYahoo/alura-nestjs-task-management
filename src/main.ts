import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { configSwagger } from './helpers';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  // swagger
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('/', app, document);

  /* app.useGlobalInterceptors(
  new TransformInterceptor(),
  );*/
  const port = 3000;
  await app.listen(port);
  logger.log(`Aplicação disponível na porta ${port}`);
}

bootstrap();
