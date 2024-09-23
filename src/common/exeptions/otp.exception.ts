import { HttpStatus } from '@nestjs/common';
import { ApiException } from './api.excetion';
import { ErrorMessage } from '../enums/error-message.enum';

export class OtpException extends ApiException {
    constructor(objectOrError?: string | object, statusCode?: HttpStatus, ctx?: string) {
        super(objectOrError, 400, ctx);
    }

    public static maxOtpOnTime(): OtpException {
        return new OtpException(ErrorMessage.MAX_OTP_ONTIME);
    }

    public static otpInvalid(): OtpException {
        return new OtpException(ErrorMessage.OTP_INVALID);
    }

    public static otpActionInvalid(): OtpException {
        return new OtpException(ErrorMessage.OTP_ACTION_INVALID);
    }

    public static smsOtpWithinLimitTime(): OtpException {
        return new OtpException(ErrorMessage.OTP_HAS_SMS_WITHIN_LIMIT_TIME);
    }

    public static otpExpired(): OtpException {
        return new OtpException(ErrorMessage.OTP_EXPIRED);
    }

    public static sendOtpFail(error: Error): OtpException {
        return new OtpException(error);
    }
}
