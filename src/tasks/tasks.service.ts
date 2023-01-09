import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TaskRepository } from './task.repository';
import { TasksModel } from './tasks.model';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private readonly taskRepository: TaskRepository,
  ) {}

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
  async findById(id: string): Promise<TasksModel> {
    try {
      return await this.taskRepository.findOneByOrFail({ id });
    } catch (e) {
      throw new NotFoundException(`Tarefa não encontrada para o ID: ${id}`);
    }
  }

  //
  // findById(id: string): TasksModel {
  //   const taskFound = this.tasks.find((task) => task.id === id);
  //   if (!taskFound) {
  //     throw new NotFoundException('Tarefa não encontrada');
  //   }
  //   return taskFound;
  // }
  //
  // getAll(): TasksModel[] {
  //   return this.tasks;
  // }
  //
  // create(title: string, description: string): TasksModel {
  //   const newTask: TasksModel = {
  //     id: randomUUID(),
  //     title,
  //     description,
  //     status: TasksStatus.OPEN,
  //   };
  //
  //   this.tasks.push(newTask);
  //   return newTask;
  // }
  //
  // updateStatus(id: string, status: TasksStatus): TasksModel {
  //   const task: TasksModel = this.findById(id);
  //   task.status = status;
  //   return task;
  // }
  //
  // remove(id: string): void {
  //   this.findById(id);
  //   this.tasks = this.tasks.filter((task) => task.id !== id);
  // }
}
