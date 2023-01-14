import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { TaskEntity, TasksModel } from '../tasks';
import { UserInterface } from './interfaces';

@Entity()
export class UserEntity implements UserInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany((_type) => TaskEntity, (task) => task.user, { eager: true })
  tasks: TasksModel[];
}
