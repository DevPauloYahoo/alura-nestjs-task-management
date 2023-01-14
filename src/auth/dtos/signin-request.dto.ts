import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SignInRequestDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'Nome do usuário é obrigatório',
  })
  username: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Senha é obrigatório' })
  password: string;
}
