import { applyDecorators, SetMetadata } from '@nestjs/common';
import { PUBLIC_API } from '../constants/index.contant';

export const Public = (): any => {
    return applyDecorators(SetMetadata(PUBLIC_API, true));
};
