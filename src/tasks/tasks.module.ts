import { Module } from '@nestjs/common';

import { TaskRepository } from './task.repository';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [TaskRepository],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
