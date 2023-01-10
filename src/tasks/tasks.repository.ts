import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { CreateReqTaskDto } from './dtos/task-dto';
import { TaskEntity } from './task.entity';
import { TasksModel, TasksStatus } from './tasks.model';

@Injectable()
export class TasksRepository extends Repository<TaskEntity> {
  constructor(private datasource: DataSource) {
    super(TaskEntity, datasource.createEntityManager());
  }

  async createTask({ title, description }: CreateReqTaskDto): Promise<TaskEntity> {
    const newTask: TasksModel = this.create({
      title,
      description,
      status: TasksStatus.OPEN,
    });
    return await this.save(newTask);
  }
}
