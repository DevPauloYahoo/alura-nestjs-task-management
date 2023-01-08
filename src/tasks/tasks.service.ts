import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { CreateReqTaskDto, CreateRespTaskDto, GetTaskFilterDto } from './dtos/task-dto';
import { TasksModel, TasksStatus } from './tasks.model';

@Injectable()
export class TasksService {
  private tasks: TasksModel[] = [];

  getTasksWithFilter(filterDto: GetTaskFilterDto): TasksModel[] {
    const { status, search } = filterDto;

    let tasks = this.getAll();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter((task) => {
        return task.title.includes(search) || task.description.includes(search);
      });
    }

    return tasks;
  }

  findById(id: string): TasksModel | NotFoundException {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      return new NotFoundException('Tarefa não encontrada');
    }
    return task;
  }

  getAll(): TasksModel[] {
    return this.tasks;
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

  updateStatus(id: string, status: TasksStatus): TasksModel {
    const task: TasksModel = this.findById(id) as TasksModel;
    task.status = status;
    return task;
  }

  remove(id: string): void {
    this.findById(id);
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
