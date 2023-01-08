import { Body, Controller, Get, Post } from '@nestjs/common';

import { ResponseTaskDto, TaskDto } from './dtos/task-dto';
import { TasksModel } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('api/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAllTasks(): TasksModel[] {
    return this.tasksService.getAllTasks();
  }

  @Post()
  createTask(@Body() requestTaskDto: TaskDto): ResponseTaskDto {
    const { title, description } = requestTaskDto;
    return this.tasksService.createTask(title, description);
  }
}
