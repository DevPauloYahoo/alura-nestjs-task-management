import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';

import { CreateReqTaskDto, CreateRespTaskDto } from './dtos/task-dto';
import { TasksModel } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('api/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAllTasks(): TasksModel[] {
    return this.tasksService.getAll();
  }

  @Get(':id')
  getTaskById(@Param('id') id: string): TasksModel | NotFoundException {
    return this.tasksService.findById(id);
  }

  @Post()
  createTask(@Body() createReqTaskDto: CreateReqTaskDto): CreateRespTaskDto {
    return this.tasksService.create(createReqTaskDto);
  }
}
