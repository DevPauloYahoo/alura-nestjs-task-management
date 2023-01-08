import { Body, Controller, Get, Post } from '@nestjs/common';

import { CreateReqTaskDto, CreateRespTaskDto } from './dtos/task-dto';
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
  createTask(@Body() createReqTaskDto: CreateReqTaskDto): CreateRespTaskDto {
    return this.tasksService.createTask(createReqTaskDto);
  }
}
