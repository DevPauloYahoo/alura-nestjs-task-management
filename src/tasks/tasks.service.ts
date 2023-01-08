import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  private tasks: any[] = [];

  getAllTasks() {
    return this.tasks;
  }
}
