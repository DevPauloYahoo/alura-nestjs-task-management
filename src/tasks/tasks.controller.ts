import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserInterface } from '../auth';
import { GetUserDecorator } from '../auth/decorators/get-user.decorator';
import {
  CreateReqTaskDto,
  GetTaskFilterDto,
  UpdateTaskStatusDto,
} from './dtos';
import { TasksModel } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('api/tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private readonly logger = new Logger('TasksController', { timestamp: true });

  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAllTasks(
    @Query() filterDto: GetTaskFilterDto,
    @GetUserDecorator() user: UserInterface,
  ): Promise<TasksModel[]> {
    this.logger.verbose(`Usuário (${user.username}) buscando todas as tarefas`);
    return this.tasksService.getTasks(filterDto, user);
  }

  @Get(':id')
  getTaskById(
    @Param('id') id: string,
    @GetUserDecorator() user: UserInterface,
  ): Promise<TasksModel> {
    this.logger.verbose(`Usuário (${user.username}) buscando uma tarefa`);
    return this.tasksService.findById(id, user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  createTask(
    @Body() createReqTaskDto: CreateReqTaskDto,
    @GetUserDecorator() user: UserInterface,
  ): Promise<TasksModel> {
    this.logger.verbose(`Usuário (${user.username}) criou uma tarefa`);
    return this.tasksService.create(createReqTaskDto, user);
  }

  @Patch(':id/status')
  updateStatusTask(
    @Param('id') id: string,
    @Body() { status }: UpdateTaskStatusDto,
    @GetUserDecorator() user: UserInterface,
  ): Promise<TasksModel> {
    return this.tasksService.updateStatus(id, status, user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTaskById(
    @Param('id') id: string,
    @GetUserDecorator() user: UserInterface,
  ): Promise<void> {
    return this.tasksService.remove(id, user);
  }
}
