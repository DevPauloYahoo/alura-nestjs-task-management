import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { UserInterface } from '../user.entity';

export const GetUserDecorator = createParamDecorator(
  (_data, ctx: ExecutionContext): UserInterface => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
