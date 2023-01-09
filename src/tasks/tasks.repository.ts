import { Repository } from 'typeorm';

import { CreateReqTaskDto } from './dtos/task-dto';
import { TaskEntity } from './task.entity';
import { TasksModel, TasksStatus } from './tasks.model';

export class TasksRepository extends Repository<TaskEntity> {
  async createTask(createReqTaskDto: CreateReqTaskDto): Promise<TaskEntity> {
    const { title, description } = createReqTaskDto;
    const newTask: TasksModel = this.create({
      title,
      description,
      status: TasksStatus.OPEN,
    });
    return await this.save(newTask);
  }
}
