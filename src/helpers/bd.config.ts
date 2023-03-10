import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const BD_CONNECTION: TypeOrmModuleOptions = {
  type: process.env.BD_TYPE,
  host: process.env.BD_HOST,
  port: process.env.BD_PORT,
  username: process.env.BD_USERNAME,
  password: process.env.BD_PASSWORD,
  database: process.env.BD_DATABASE,
  autoLoadEntities: true,
  synchronize: true,
} as TypeOrmModuleOptions;
