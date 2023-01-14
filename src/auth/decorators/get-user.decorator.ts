import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { UserInterface } from '../interfaces';

export const GetUserDecorator = createParamDecorator(
  (_data, ctx: ExecutionContext): UserInterface => {
    const { user } = ctx.switchToHttp().getRequest();
    return user;
  },
);
