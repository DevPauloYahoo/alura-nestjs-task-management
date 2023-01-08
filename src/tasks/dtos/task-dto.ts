import { TasksStatus } from '../tasks.model';

export class TaskDto {
  title: string;
  description: string;
}

export class ResponseTaskDto {
  id: string;
  title: string;
  description: string;
  status: TasksStatus;
}
