import { Controller, Get } from '@nestjs/common';

import { TasksModel } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('api/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAllTasks(): TasksModel[] {
    return this.tasksService.getAllTasks();
  }
}
