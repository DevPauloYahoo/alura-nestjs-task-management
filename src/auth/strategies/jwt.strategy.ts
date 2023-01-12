import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { JwtPayloadInterface } from '../jwt-payload.interface';
import { UserInterface } from '../user.entity';
import { UsersRepository } from '../users.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger('TasksRepository');

  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate({ username }: JwtPayloadInterface): Promise<UserInterface> {
    const user = this.usersRepository.findOneBy({
      username,
    });

    if (!user) {
      this.logger.error(`Acesso negado ao Usuário (${username})`);
      throw new UnauthorizedException('Usuário não autorizado');
    }

    return user;
  }
}
