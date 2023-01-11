import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { genSaltSync, hashSync } from 'bcrypt';
import { DataSource, Repository } from 'typeorm';

import { SignUpRequestDto } from './dtos';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersRepository extends Repository<UserEntity> {
  constructor(private readonly datasource: DataSource) {
    super(UserEntity, datasource.createEntityManager());
  }

  async createUser({ username, password }: SignUpRequestDto): Promise<void> {
    const salt = genSaltSync(10);
    password = hashSync(password, salt);

    const newUser = this.create({
      username,
      password,
    });

    try {
      await this.save(newUser);
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('Nome de usuário já usado em outro cadastro');
      }
      throw new InternalServerErrorException(err.message);
    }
  }
}
