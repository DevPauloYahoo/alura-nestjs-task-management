import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';

import { UserInterface } from '../auth';
import { CreateReqTaskDto, GetTaskFilterDto } from './dtos';
import { TasksModel, TasksStatus } from './tasks.model';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  private readonly logger = new Logger('TasksService', { timestamp: true });

  constructor(private readonly taskRepository: TasksRepository) {}

  getTasks(
    filterDto: GetTaskFilterDto,
    user: UserInterface,
    options: IPaginationOptions,
  ): Promise<Pagination<TasksModel>> {
    this.logger.verbose(`Usuário (${user.username}) buscando todas as tarefas`);
    return this.taskRepository.getAllTasks(filterDto, options, user);
  }

  async findById(id: string, user: UserInterface): Promise<TasksModel> {
    this.logger.verbose(`Usuário (${user.username}) buscando uma tarefa`);

    try {
      return await this.taskRepository.findOneByOrFail({ id, user });
    } catch (e) {
      throw new NotFoundException(`Tarefa não encontrada para o ID: ${id}`);
    }
  }

  create(
    createReqTaskDto: CreateReqTaskDto,
    user: UserInterface,
  ): Promise<TasksModel> {
    this.logger.verbose(`Usuário (${user.username}) criou uma tarefa`);
    return this.taskRepository.createTask(createReqTaskDto, user);
  }

  async updateStatus(
    id: string,
    status: TasksStatus,
    user: UserInterface,
  ): Promise<TasksModel> {
    const task: TasksModel = await this.findById(id, user);
    task.status = status;
    return await this.taskRepository.save(task);
  }

  async remove(id: string, user: UserInterface): Promise<void> {
    const result = await this.taskRepository.delete({ id, user });

    if (result.affected === 0) {
      throw new NotFoundException(`Tarefa não encontrada para o ID: ${id}`);
    }
  }
}
