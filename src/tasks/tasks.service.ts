import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { CreateReqTaskDto, CreateRespTaskDto } from './dtos/task-dto';
import { TasksModel, TasksStatus } from './tasks.model';

@Injectable()
export class TasksService {
  private tasks: TasksModel[] = [];

  getAll(): TasksModel[] {
    return this.tasks;
  }

  findById(id: string): TasksModel | NotFoundException {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      return task;
    }
    return new NotFoundException('Tarefa não encontrada');
  }

  create(createReqTaskDto: CreateReqTaskDto): CreateRespTaskDto {
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
