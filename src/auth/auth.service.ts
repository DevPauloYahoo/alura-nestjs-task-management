import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compareSync } from 'bcrypt';

import { SignInRequestDto, SignInResponseDto, SignUpRequestDto } from './dtos';
import { UserInterface } from './user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UsersRepository) {}

  signUp(createUserDto: SignUpRequestDto): Promise<void> {
    return this.userRepository.createUser(createUserDto);
  }

  async signIn({ username, password }: SignInRequestDto): Promise<SignInResponseDto> {
    const user: UserInterface = await this.userRepository.findOneBy({
      username,
    });

    const isMatchePassword: boolean = compareSync(password, user.password);

    if (user && isMatchePassword) {
      return { signIn: 'sucsess' };
    }

    throw new UnauthorizedException('Usuário e/ou senha inválido');
  }
}
