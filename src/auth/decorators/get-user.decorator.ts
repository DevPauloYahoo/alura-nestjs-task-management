import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { UserInterface } from '../user.entity';

export const GetUserDecorator = createParamDecorator(
  (_data, ctx: ExecutionContext): UserInterface => {
    const { user } = ctx.switchToHttp().getRequest();
    return user;
    // const req = ctx.switchToHttp().getRequest();
    // return req.user;
  },
);
