import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { UserEntity } from './user.entity';

@Injectable()
export class UsersRepository extends Repository<UserEntity> {
  constructor(private readonly datasource: DataSource) {
    super(UserEntity, datasource.createEntityManager());
  }
}
