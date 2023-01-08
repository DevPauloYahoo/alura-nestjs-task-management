import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { CreateReqTaskDto, CreateRespTaskDto, GetTaskFilterDto } from './dtos/task-dto';
import { TasksModel, TasksStatus } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('api/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAll(@Query() filterDto: GetTaskFilterDto): TasksModel[] {
    if (Object.keys(filterDto).length) {
      console.log('OBJECT FILTER', filterDto);
      return this.tasksService.getTasksWithFilter(filterDto);
    } else {
      return this.tasksService.getAll();
    }
  }

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

  @Patch(':id/status')
  updateStatusTask(@Param('id') id: string, @Body('status') status: TasksStatus): TasksModel {
    return this.tasksService.updateStatus(id, status);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTaskById(@Param('id') id: string): void {
    this.tasksService.remove(id);
  }
}
