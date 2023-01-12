import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreateReqTaskDto, GetTaskFilterDto, UpdateTaskStatusDto } from './dtos';
import { TasksModel } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('api/tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAllTasks(@Query() filterDto: GetTaskFilterDto): Promise<TasksModel[]> {
    return this.tasksService.getTasks(filterDto);
  }

  @Get(':id')
  getTaskById(@Param('id') id: string): Promise<TasksModel> {
    return this.tasksService.findById(id);
  }

  @Post()
  createTask(@Body() createReqTaskDto: CreateReqTaskDto): Promise<TasksModel> {
    return this.tasksService.create(createReqTaskDto);
  }

  @Patch(':id/status')
  updateStatusTask(
    @Param('id') id: string,
    @Body() { status }: UpdateTaskStatusDto,
  ): Promise<TasksModel> {
    return this.tasksService.updateStatus(id, status);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTaskById(@Param('id') id: string): Promise<void> {
    return this.tasksService.remove(id);
  }
}
