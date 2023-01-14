import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateReqTaskDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Título é obrigatório' })
  title: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Descrição é obrigatório',
  })
  description: string;
}
