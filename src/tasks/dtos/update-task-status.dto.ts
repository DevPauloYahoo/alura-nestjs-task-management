import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

import { TasksStatus } from '../tasks.model';

export class UpdateTaskStatusDto {
  @ApiProperty({ enum: TasksStatus, default: 'OPEN', isArray: true })
  @IsEnum(TasksStatus, {
    message: 'O valor do Status informado é inválido',
  })
  status: TasksStatus;
}
