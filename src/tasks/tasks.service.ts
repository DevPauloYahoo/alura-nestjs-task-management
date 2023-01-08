import { Injectable } from '@nestjs/common';

import { TasksModel } from './tasks.model';

@Injectable()
export class TasksService {
  private tasks: TasksModel[] = [];

  getAllTasks(): TasksModel[] {
    return this.tasks;
  }
}
