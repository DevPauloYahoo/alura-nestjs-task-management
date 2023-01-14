import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth';
import { CONFIG_VALIDATION_SCHEMA } from './helpers';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.profile.${process.env.PROFILE}`],
      validationSchema: CONFIG_VALIDATION_SCHEMA,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        autoLoadEntities: true,
        synchronize: true,
        host: configService.getOrThrow('BD_HOST'),
        port: configService.getOrThrow('BD_PORT'),
        username: configService.getOrThrow('BD_USERNAME'),
        password: configService.getOrThrow('BD_PASSWORD'),
        database: configService.getOrThrow('BD_DATABASE'),
      }),
    }),
    AuthModule,
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
