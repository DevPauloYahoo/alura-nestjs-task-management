import { Transform } from 'class-transformer';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import {
  UserEntity,
  UserInterface,
} from '../auth';
import {
  TasksModel,
  TasksStatus,
} from './tasks.model';

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

  // @Exclude({ toPlainOnly: true })
  @Transform(({ value }) => value.id)
  @ManyToOne(
    (_type) => UserEntity,
    (user) => user.tasks,
    { eager: false },
  )
  user: UserInterface;
}
