import { IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({
    message: 'Nome do usuário é obrigatório',
  })
  @Length(4, 50, {
    message: 'Nome do usuário deve ter entre 4 e 50 caracteres',
  })
  username: string;

  @IsNotEmpty({ message: 'Senha é obrigatório' })
  @Length(4, 20, {
    message: 'Senha deve ter entre 4 e 20 caracteres',
  })
  password: string;
}
