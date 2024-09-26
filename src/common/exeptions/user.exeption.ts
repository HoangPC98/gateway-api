import { HttpStatus } from '@nestjs/common';
import { ErrorMessage } from '../enums/error-message.enum';
import { ApiException } from './api.excetion';

export class UserException extends ApiException {
    constructor(objectOrError?: string | object, statusCode?: HttpStatus , ctx?: string) {
        super(objectOrError, 400, ctx);
    }

    public static notVerified(): UserException {
        return new UserException(ErrorMessage.ACCOUNT_NOT_VERIFIED, HttpStatus.BAD_REQUEST);
    }

    public static phoneExisted(): UserException {
        return new UserException(ErrorMessage.PHONE_NUMBER_ALREADY_EXIT);
    }

    public static changePasswordOtpInvalid(): UserException {
        return new UserException(ErrorMessage.OTP_INVALID);
    }

    public static forgotPasswordOtpNotValid(): UserException {
        return new UserException(ErrorMessage.OTP_INVALID);
    }

    public static notFound(): UserException {
        return new UserException(ErrorMessage.CUSTOMER_NOT_EXIST);
    }

    public static missingEmail(): UserException {
        return new UserException(ErrorMessage.CLIENT_MISSING_EMAIL);
    }

    public static unverifiedEmail(): UserException {
        return new UserException(ErrorMessage.CLIENT_EMAIL_UNVERIFIED);
    }


    public static lockedOrDeleted(): UserException {
        return new UserException(ErrorMessage.CLIENT_LOCKED_OR_DELETED);
    }

    public static sameOldPassword(): UserException {
        return new UserException(ErrorMessage.SAME_OLD_PASSWORD);
    }

    public static unVerifyIdentity(): UserException {
        return new UserException(ErrorMessage.IDENTITY_INVALID);
    }

    public static PaymentLinkInvalid(): UserException {
        return new UserException(ErrorMessage.PAYMENT_LINK_INVALID);
    }

    public static forgotPasswordNotValidIdentify(): UserException {
        return new UserException(ErrorMessage.FORGOT_PASSWORD_INVALID_IDENTITY);
    }

    public static forgotPasswordNotValidBankData(): UserException {
        return new UserException(ErrorMessage.FORGOT_PASSWORD_INVALID_BANK_DATA);
    }

    public static accountIsNotVerified(): UserException {
        return new UserException(ErrorMessage.ACCOUNT_IS_NOT_VERIFIED);
    }

    public static accountReceiverIsNotLinkToBank(): UserException {
        return new UserException(ErrorMessage.ACCOUNT_RECEIVER_IS_NOT_LINK_TO_BANK);
    }

    public static accountReceiverIsNotVerified(): UserException {
        return new UserException(ErrorMessage.ACCOUNT_RECEIVER_IS_NOT_VERIFIED);
    }

    public static accountIdentityNumberOrEmailIsExisted(): UserException {
        return new UserException('Số CMND/CCCD hoặc Email đã tồn tại trên hệ thống !');
    }

    public static merchantEtpLinkExisted(): UserException {
        return new UserException('Tài khoản này đã liên kết ví HPAY !');
    }
}
