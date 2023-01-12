import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';

import {
  SignInRequestDto,
  SignInResponseDto,
  SignUpRequestDto,
} from './dtos';
import { JwtPayloadInterface } from './jwt-payload.interface';
import { UserInterface } from './user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  signUp(
    createUserDto: SignUpRequestDto,
  ): Promise<void> {
    return this.userRepository.createUser(
      createUserDto,
    );
  }

  async signIn({
    username,
    password,
  }: SignInRequestDto): Promise<SignInResponseDto> {
    // busca o usuário pelo username informado
    const user: UserInterface =
      await this.userRepository.findOneBy({
        username,
      });

    // se houver usuário e a senha estiver correta
    if (
      user &&
      compareSync(password, user.password)
    ) {
      // monta o payload com o nome do usuário
      const payload: JwtPayloadInterface = {
        username,
      };

      // gera access_token
      const access_token: string =
        this.jwtService.sign(payload);

      //e retorna
      return { access_token };
    }

    // caso contrário, retorna erro de permissão negada
    throw new UnauthorizedException(
      'Usuário e/ou senha inválido',
    );
  }
}
