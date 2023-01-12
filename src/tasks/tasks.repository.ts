import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { UserInterface } from '../auth';
import { CreateReqTaskDto, GetTaskFilterDto } from './dtos';
import { TaskEntity } from './task.entity';
import { TasksModel, TasksStatus } from './tasks.model';

@Injectable()
export class TasksRepository extends Repository<TaskEntity> {
  private readonly logger = new Logger('TasksRepository', { timestamp: true });

  constructor(private datasource: DataSource) {
    super(TaskEntity, datasource.createEntityManager());
  }

  async createTask(
    { title, description }: CreateReqTaskDto,
    user: UserInterface,
  ): Promise<TasksModel> {
    const newTask: TasksModel = this.create({
      title,
      description,
      status: TasksStatus.OPEN,
      user,
    });
    return await this.save(newTask);
  }

  async getAllTasks(
    { search, status }: GetTaskFilterDto,
    user: UserInterface,
  ): Promise<TasksModel[]> {
    const query = this.createQueryBuilder('task');

    query.where({ user });

    if (status) {
      query.andWhere('task.status = :status', {
        status,
      });
    }

    if (search) {
      query.andWhere(
        `(LOWER(task.description) LIKE LOWER(:search) 
               OR 
               LOWER(task.title) LIKE LOWER(:search))`,
        {
          search: `%${search}%`,
        },
      );
    }

    try {
      return await query.getMany();
    } catch (err) {
      this.logger.error(
        `Erro ao buscar tarefas para o Usuário (${user.username})`,
        err.message,
      );
      throw new InternalServerErrorException('Erro ao buscar dados');
    }
  }
}
