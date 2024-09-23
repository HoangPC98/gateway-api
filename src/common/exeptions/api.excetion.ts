import { HttpException, HttpStatus } from '@nestjs/common';
import { LogErrorObjT } from '../types/common.type';
import { ErrorCtx } from '../enums/error.enum';

export class ApiException extends HttpException {
    public context: string;
    public error: string | object;
    public traceid: string;
    public statusCode: number;
    public code?: string;
    public config?: unknown;
    public user?: string;

    constructor(
        error: string | object = 'Something went wrong. Please try again.',
        status?: HttpStatus,
        private readonly errCtx?: string | ErrorCtx,
    ) {
        super(error || 'Bad Request', status || 400);
    }
}
