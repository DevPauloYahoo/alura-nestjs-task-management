import { TasksModel } from '../../tasks';

export interface UserInterface {
  id: string;
  username: string;
  password: string;
  tasks: TasksModel[];
}
