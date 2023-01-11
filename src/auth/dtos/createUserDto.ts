import { IsNotEmpty, Length, Min } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Nome do usuário é obrigatório' })
  @Min(4, { message: 'Nome do usuário deve ter no mínimo 4 caracteres' })
  username: string;

  @IsNotEmpty({ message: 'Senha é obrigatório' })
  @Length(4, 20, { message: 'Senha deve ter entre 4 e 20 caracteres' })
  password: string;
}
