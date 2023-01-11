import { IsNotEmpty } from 'class-validator';

export class SignInRequestDto {
  @IsNotEmpty({
    message: 'Nome do usuário é obrigatório',
  })
  username: string;

  @IsNotEmpty({ message: 'Senha é obrigatório' })
  password: string;
}
