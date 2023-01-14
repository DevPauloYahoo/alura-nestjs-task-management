import { ApiProperty } from '@nestjs/swagger';

import { UserInterface } from '../../auth';
import { TasksStatus } from '../tasks.model';

export class ResponseTaskDto {
  @ApiProperty({ required: false })
  id: string;

  @ApiProperty({ required: false })
  title: string;

  @ApiProperty({ required: false })
  description: string;

  @ApiProperty({ enum: TasksStatus, required: false })
  status: TasksStatus;

  @ApiProperty({ required: false })
  user: UserInterface;
}
