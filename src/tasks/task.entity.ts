import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { TasksModel, TasksStatus } from './tasks.model';

@Entity()
export class TaskEntity implements TasksModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TasksStatus;
}
