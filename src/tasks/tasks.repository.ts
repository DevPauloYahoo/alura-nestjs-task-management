import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { CreateReqTaskDto, GetTaskFilterDto } from './dtos/task-dto';
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

  async getAllTasks({ search, status }: GetTaskFilterDto): Promise<TasksModel[]> {
    const query = this.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        `LOWER(task.description) LIKE LOWER(:search) 
               OR 
               LOWER(task.title) LIKE LOWER(:search)`,
        {
          search: `%${search}%`,
        },
      );
    }

    return await query.getMany();
  }
}
