import { applyDecorators, ExecutionContext, SetMetadata, createParamDecorator } from '@nestjs/common';
import { DEVICE_ID, PUBLIC_API } from '../constants/index.contant';

export const Public = (): any => {
  return applyDecorators(SetMetadata(PUBLIC_API, true));
};

export const DeviceIdLogged = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.headers[DEVICE_ID];
});

export const UserLogged = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
