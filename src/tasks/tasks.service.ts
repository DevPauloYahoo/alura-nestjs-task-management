import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { CreateReqTaskDto, CreateRespTaskDto } from './dtos/task-dto';
import { TasksModel, TasksStatus } from './tasks.model';

@Injectable()
export class TasksService {
  private tasks: TasksModel[] = [];

  getAllTasks(): TasksModel[] {
    return this.tasks;
  }

  createTask(createReqTaskDto: CreateReqTaskDto): CreateRespTaskDto {
    const { title, description } = createReqTaskDto;
    const task: TasksModel = {
      id: randomUUID(),
      title,
      description,
      status: TasksStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }
}
