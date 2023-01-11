import { Injectable } from '@nestjs/common';

import { UsersRepository } from './users.repository';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UsersRepository) {}
}
