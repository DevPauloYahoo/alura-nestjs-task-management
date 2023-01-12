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

import { UserInterface } from '../auth';
import { GetUserDecorator } from '../auth/decorators/get-user.decorator';
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
  createTask(
    @Body() createReqTaskDto: CreateReqTaskDto,
    @GetUserDecorator() user: UserInterface,
  ): Promise<TasksModel> {
    return this.tasksService.create(createReqTaskDto, user);
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
