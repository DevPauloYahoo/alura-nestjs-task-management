import { UserInterface } from '../auth';

export interface TasksModel {
  id: string;
  title: string;
  description: string;
  status: TasksStatus;
  user: UserInterface;
}

export enum TasksStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
