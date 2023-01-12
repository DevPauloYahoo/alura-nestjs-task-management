import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

import { TasksStatus } from '../tasks.model';

export class CreateReqTaskDto {
  @IsNotEmpty({ message: 'Título é obrigatório' })
  title: string;

  @IsNotEmpty({
    message: 'Descrição é obrigatório',
  })
  description: string;
}

export class CreateRespTaskDto {
  id: string;
  title: string;
  description: string;
  status: TasksStatus;
}

export class UpdateTaskStatusDto {
  @IsEnum(TasksStatus, {
    message:
      'O valor do Status informado é inválido',
  })
  status: TasksStatus;
}

export class GetTaskFilterDto {
  @IsOptional()
  @IsEnum(TasksStatus, {
    message: 'Valor do status inválido ',
  })
  status?: TasksStatus;

  @IsOptional()
  search?: string;
}
