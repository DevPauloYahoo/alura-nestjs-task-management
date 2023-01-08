import { IsNotEmpty } from 'class-validator';

import { TasksStatus } from '../tasks.model';

export class CreateReqTaskDto {
  @IsNotEmpty({ message: 'Título é obrigatório' })
  title: string;

  @IsNotEmpty({ message: 'Descrição é obrigatório' })
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
