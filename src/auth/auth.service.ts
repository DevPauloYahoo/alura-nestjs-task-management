import { Injectable } from '@nestjs/common';

import { CreateUserDto } from './dtos';
import { UsersRepository } from './users.repository';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UsersRepository) {}

  signUp(createUserDto: CreateUserDto): Promise<void> {
    return this.userRepository.createUser(createUserDto);
  }
}
