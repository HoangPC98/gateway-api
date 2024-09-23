import { HttpStatus } from '@nestjs/common';
import { ErrorMessage } from '../enums/error-message.enum';
import { ApiException } from './api.excetion';

const HTTP_STATUS_USER_LOCKED = 430;
const HTTP_STATUS_USER_TEMP_LOCKED = 431;
const HTTP_STATUS_USER_CANCELED_DELETE = 432;

export class AuthException extends ApiException {
    constructor(objectOrError?: string | object, statusCode?: number, context?: string) {
        super(objectOrError, statusCode, context);
    }

    public static loginTry(remaining: number): AuthException {
        return new AuthException(`REMINDS_WRONG_PASSWORD_${remaining}`, HttpStatus.BAD_REQUEST);
    }

    public static lock(reason?: string): AuthException {
        return new AuthException(reason || ErrorMessage.CLIENT_LOCKED_OR_DELETED, HTTP_STATUS_USER_LOCKED);
    }

    public static tempLock(reason?: string): AuthException {
        return new AuthException(reason || ErrorMessage.CLIENT_LOCKED_OR_DELETED, HTTP_STATUS_USER_TEMP_LOCKED);
    }

    public static loginNewDevice(): AuthException {
        return new AuthException(ErrorMessage.CLIENT_WAS_LOGIN_ON_NEW_DEVICE, HttpStatus.NOT_ACCEPTABLE);
    }

    public static deviceNotValid(): AuthException {
        return new AuthException(ErrorMessage.DEVICE_NOT_VALID);
    }

    public static notVerified(): AuthException {
        return new AuthException(ErrorMessage.ACCOUNT_NOT_VERIFIED);
    }

    public static cancelDeleted(reason?: string): AuthException {
        return new AuthException(reason || ErrorMessage.CLIENT_CANCELED_OR_DELETED, HTTP_STATUS_USER_CANCELED_DELETE);
    }
}
