import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { CreateUserDto } from './dtos';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersRepository extends Repository<UserEntity> {
  constructor(private readonly datasource: DataSource) {
    super(UserEntity, datasource.createEntityManager());
  }

  async createUser({ username, password }: CreateUserDto): Promise<void> {
    const newUser = this.create({
      username,
      password,
    });

    await this.save(newUser);
  }
}
