import { DocumentBuilder } from '@nestjs/swagger';

export const configSwagger = new DocumentBuilder()
  .setTitle('Nest API Tasks')
  .setDescription('API development with NestJs version 9')
  .setVersion('1.0.0')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'jwt',
      in: 'header',
    },
    'access_token',
  )
  .build();
