import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length, Matches } from 'class-validator';

const REGEX = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

export class SignUpRequestDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'Nome do usuário é obrigatório',
  })
  @ApiProperty()
  @Length(4, 30, {
    message: 'Nome do usuário deve ter entre 4 e 30 caracteres',
  })
  username: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Senha é obrigatório' })
  @Length(4, 20, {
    message: 'Senha deve ter entre 4 e 20 caracteres',
  })
  @Matches(REGEX, {
    message:
      'A senha deve conter letra maiúscula e minúscula, número ou caracter especial ',
  })
  password: string;
}
