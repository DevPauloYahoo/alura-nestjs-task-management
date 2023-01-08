import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { TasksModel, TasksStatus } from './tasks.model';

@Injectable()
export class TasksService {
  private tasks: TasksModel[] = [];

  getAllTasks(): TasksModel[] {
    return this.tasks;
  }

  createTask(title: string, description: string): TasksModel {
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
