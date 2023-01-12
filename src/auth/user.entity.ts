import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { TasksModel } from '../tasks';
import { TaskEntity } from '../tasks/task.entity';

@Entity()
export class UserEntity implements UserInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(
    (_type) => TaskEntity,
    (task) => task.user,
    { eager: true },
  )
  tasks: TasksModel[];
}

export interface UserInterface {
  id: string;
  username: string;
  password: string;
  tasks: TasksModel[];
}
