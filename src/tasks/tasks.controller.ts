import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';

import { GetUserDecorator, UserInterface } from '../auth';
import { CreateReqTaskDto, ResponseTaskDto, UpdateTaskStatusDto } from './dtos';
import { TasksStatus } from './tasks.model';
import { TasksService } from './tasks.service';

@ApiTags('tasks')
@ApiBearerAuth('access_token')
@Controller('api/tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'status', enum: TasksStatus, required: false })
  @ApiOkResponse({ type: ResponseTaskDto, isArray: true })
  getAllTasks(
    @Query('page', new DefaultValuePipe(1)) page: number,
    @Query('limit', new DefaultValuePipe(10)) limit: number,
    @Query('search') search: string,
    @Query('status') status: TasksStatus,
    @GetUserDecorator() user: UserInterface,
  ): Promise<Pagination<ResponseTaskDto>> {
    console.log(user);
    return this.tasksService.getTasks({ search, status }, user, {
      page,
      limit,
    });
  }

  @Get(':id')
  @ApiOkResponse({ type: ResponseTaskDto })
  @ApiNotFoundResponse()
  getTaskById(
    @Param('id') id: string,
    @GetUserDecorator() user: UserInterface,
  ): Promise<ResponseTaskDto> {
    return this.tasksService.findById(id, user);
  }

  @Post()
  @ApiCreatedResponse({ type: ResponseTaskDto })
  @UseInterceptors(ClassSerializerInterceptor)
  createTask(
    @Body() createReqTaskDto: CreateReqTaskDto,
    @GetUserDecorator() user: UserInterface,
  ): Promise<ResponseTaskDto> {
    return this.tasksService.create(createReqTaskDto, user);
  }

  @Patch(':id/status')
  updateStatusTask(
    @Param('id') id: string,
    @Body() { status }: UpdateTaskStatusDto,
    @GetUserDecorator() user: UserInterface,
  ): Promise<ResponseTaskDto> {
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
