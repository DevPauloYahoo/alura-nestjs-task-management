import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { CreateReqTaskDto } from './dtos/task-dto';
import { TasksModel } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('api/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // @Get()
  // getAll(@Query() filterDto: GetTaskFilterDto): TasksModel[] {
  //   if (Object.keys(filterDto).length) {
  //     return this.tasksService.getTasksWithFilter(filterDto);
  //   } else {
  //     return this.tasksService.getAll();
  //   }
  // }

  // @Get()
  // getAllTasks(): TasksModel[] {
  //   return this.tasksService.getAll();
  // }

  @Get(':id')
  getTaskById(@Param('id') id: string): Promise<TasksModel> {
    return this.tasksService.findById(id);
  }

  @Post()
  createTask(@Body() createReqTaskDto: CreateReqTaskDto): Promise<TasksModel> {
    return this.tasksService.create(createReqTaskDto);
  }

  // @Get(':id')
  // getTaskById(@Param('id') id: string): TasksModel {
  //   return this.tasksService.findById(id);
  // }

  // @Post()
  // createTask(@Body() createReqTaskDto: CreateReqTaskDto): CreateRespTaskDto {
  //   const { title, description } = createReqTaskDto;
  //
  //   return this.tasksService.create(title, description);
  // }
  //
  // @Patch(':id/status')
  // updateStatusTask(
  //   @Param('id') id: string,
  //   @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  // ): TasksModel {
  //   const { status } = updateTaskStatusDto;
  //   return this.tasksService.updateStatus(id, status);
  // }
  //
  // @Delete(':id')
  // @HttpCode(HttpStatus.NO_CONTENT)
  // removeTaskById(@Param('id') id: string): void {
  //   this.tasksService.remove(id);
  // }
}
