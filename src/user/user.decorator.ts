import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator((data: unknown, ctx: any) => {
  return ctx.res.locals.user;
});
