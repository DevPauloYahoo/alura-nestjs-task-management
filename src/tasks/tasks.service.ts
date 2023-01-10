import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateReqTaskDto } from './dtos/task-dto';
import { TasksModel } from './tasks.model';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(private readonly taskRepository: TasksRepository) {}

  // private tasks: TasksModel[] = [];
  //
  // getTasksWithFilter(filterDto: GetTaskFilterDto): TasksModel[] {
  //   console.log(filterDto);
  //   const { status, search } = filterDto;
  //
  //   let tasks = this.getAll();
  //
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //
  //   if (search) {
  //     tasks = tasks.filter((task) => {
  //       return task.title.includes(search) || task.description.includes(search);
  //     });
  //   }
  //
  //   return tasks;
  // }

  async findAll(): Promise<TasksModel[]> {
    return await this.taskRepository.find();
  }

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

  //
  // updateStatus(id: string, status: TasksStatus): TasksModel {
  //   const task: TasksModel = this.findById(id);
  //   task.status = status;
  //   return task;
  // }
  //
  async remove(id: string): Promise<void> {
    const result = await this.taskRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Tarefa não encontrada para o ID: ${id}`);
    }
  }

  // remove(id: string): void {
  //   this.findById(id);
  //   this.tasks = this.tasks.filter((task) => task.id !== id);
  // }
}
