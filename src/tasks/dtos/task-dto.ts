import { TasksStatus } from '../tasks.model';

export class CreateReqTaskDto {
  title: string;
  description: string;
}

export class CreateRespTaskDto {
  id: string;
  title: string;
  description: string;
  status: TasksStatus;
}

export class GetTaskFilterDto {
  status?: TasksStatus;
  search?: string;
}
