import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateReqTaskDto, GetTaskFilterDto } from './dtos/task-dto';
import { TasksModel, TasksStatus } from './tasks.model';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(private readonly taskRepository: TasksRepository) {}

  getTasks(filterDto: GetTaskFilterDto): Promise<TasksModel[]> {
    return this.taskRepository.getAllTasks(filterDto);
  }

  // async findAll(): Promise<TasksModel[]> {
  //   return await this.taskRepository.find();
  // }

  async findById(id: string): Promise<TasksModel> {
    try {
      return await this.taskRepository.findOneByOrFail({ id });
    } catch (e) {
      throw new NotFoundException(`Tarefa não encontrada para o ID: ${id}`);
    }
  }

  create(createReqTaskDto: CreateReqTaskDto): Promise<TasksModel> {
    return this.taskRepository.createTask(createReqTaskDto);
  }

  async updateStatus(id: string, status: TasksStatus): Promise<TasksModel> {
    const task: TasksModel = await this.findById(id);
    task.status = status;
    return await this.taskRepository.save(task);
  }

  async remove(id: string): Promise<void> {
    const result = await this.taskRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Tarefa não encontrada para o ID: ${id}`);
    }
  }
}
