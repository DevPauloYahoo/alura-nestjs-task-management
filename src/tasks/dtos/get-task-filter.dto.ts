import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

import { TasksStatus } from '../tasks.model';

export class GetTaskFilterDto {
  @ApiProperty({ enum: TasksStatus, default: 'OPEN', required: false })
  @IsOptional()
  @IsEnum(TasksStatus, {
    message: 'Valor do status inválido ',
  })
  status?: TasksStatus;

  @ApiProperty({ required: false })
  @IsOptional()
  search?: string;
}
