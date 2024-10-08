export enum ErrorMessage {
    UNKNOWN_ERROR='Lỗi không xác định',

    CUSTOMER_NOT_EXIST = 'CUSTOMER_NOT_EXIST',
    CLIENT_PASSWORD_CHANGE_NOT_VALID = 'CLIENT_PASSWORD_CHANGE_NOT_VALID',
    CLIENT_MISSING_EMAIL = 'CLIENT_MISSING_EMAIL',
    CLIENT_LOCKED_OR_DELETED = 'CLIENT_LOCKED_OR_DELETED',
    CLIENT_CANCELED_OR_DELETED = 'CLIENT_CANCELED_OR_DELETED',

    CLIENT_EMAIL_UNVERIFIED = 'CLIENT_EMAIL_UNVERIFIED',
    USER_PASSWORD_CHANGE_NOT_VALID = 'USER_PASSWORD_CHANGE_NOT_VALID',
    USER_PASSWORD_CHANGE_OTP_INVALID = 'USER_PASSWORD_CHANGE_OTP_INVALID',
    ADMIN_USER_NOT_EXIST = 'ADMIN_USER_NOT_EXIST',
    USER_NOT_ACTIVE = 'USER_NOT_ACTIVE',
    OTP_ACTION_INVALID = 'OTP_ACTION_INVALID',
    OTP_HAS_SMS_WITHIN_LIMIT_TIME = 'OTP_HAS_SMS_WITHIN_LIMIT_TIME',
    SMS_REQUEST_TIMEOUT = 'SMS_REQUEST_TIMEOUT',
    SMS_RESPONSE_INVALID_FORMAT = 'SMS_RESPONSE_INVALID_FORMAT',
    OTP_EXPIRED = 'OTP_EXPIRED',
    OTP_RETRY_EXCEED = 'OTP_RETRY_EXCEED',
    SEND_OTP_EXPIRED = 'SEND_OTP_EXPIRED',
    SEND_OTP_FAILED = 'SEND_OTP_FAILED',
    MAX_OTP_ONTIME = 'MAX_OTP_ONTIME',

    // Admin User
    USER_OR_PASSWORD_INVALID = 'USER_OR_PASSWORD_INVALID',
    USER_DEACTIVATED = 'USER_DEACTIVATED',
    OTP_INVALID = 'OTP_INVALID',
    OTP_IS_NOT_EMPTY = 'OTP_IS_NOT_EMPTY',
    TOKEN_INVALID = 'TOKEN_INVALID',
    USER_NOT_CREATE = 'USER_NOT_CREATE',
    PHONE_NUMBER_INVALID = 'PHONE_NUMBER_INVALID',
    ADMIN_INVALID_EMAIL = 'ADMIN_INVALID_EMAIL',

    // Client Customer
    SAME_OLD_PASSWORD = 'SAME_OLD_PASSWORD',

    CLIENT_TEMP_LOCKED_REASON = 'CLIENT_TEMP_LOCKED_REASON',
    CLIENT_LOCKED_REASON = 'CLIENT_LOCKED_REASON',
    GROUP_PRODUCT_NOT_EXIST = 'GROUP_PRODUCT_NOT_EXIST',
    PRODUCT_NOT_EXIST = 'PRODUCT_NOT_EXIST',
    SERVICE_NOT_EXIST = 'SERVICE_NOT_EXIST',
    PRODUCT_TYPE_NOT_EXIST = 'PRODUCT_TYPE_NOT_EXIST',
    CLIENT_WAS_LOGIN_ON_NEW_DEVICE = 'CLIENT_WAS_LOGIN_ON_NEW_DEVICE',
    PHONE_NUMBER_ALREADY_EXIT = 'PHONE_NUMBER_ALREADY_EXIT',
    IDENTITY_INVALID = 'IDENTITY_INVALID',
    PAYMENT_LINK_INVALID = 'PAYMENT_LINK_INVALID',

    // Client Bank Card
    INVALID_CARD = 'Thẻ không đúng định dạng',
    INVALID_CARDNAME = 'Tên chủ thẻ không hợp lệ',
    INVALID_EXPDATE = 'Ngày hết hạn không hợp lệ',
    BALANCE_NOT_EXIST = 'Số dư không tồn tại',
    BALANCE_INTERNAL_NOT_EXIST = 'BALANCE_INTERNAL_NOT_EXIST',
    BALANCE_AVAILABLE_NOT_ENOUGH = 'Số dư không đủ thực hiện giao dịch',
    INSUFFICIENT_FUNDS = 'Số dư không đủ để thanh toán',
    NOT_MATCH_BANK = 'NOT_MATCH_BANK',
    // FAILURE card NAPAS
    LOCKED_CARD = 'Thẻ bị khóa',
    INVALID_CARDINFO = 'Thông tin thẻ không hợp lệ',
    EXPIRED_CARD = 'Thẻ hết hạn sử dụng',
    TIMED_OUT = 'Không có phản hồi từ ngân hàng',
    BANK_ERROR = 'Lỗi từ hệ thống ngân hàng',
    INVALID_CHECKSUM = 'Checksum error',
    TRANSACTION_NOT_SUPPORTED = 'Loại giao dịch không được hỗ trợ',
    PENDING_FOR_OTP = 'Thông tin thẻ đã được xác minh',
    INELIGIBLE = 'Thẻ không đủ điều kiện để thanh toán',
    TRANSACTION_LIMIT_EXCEEDED = 'Giá trị giao dịch vượt quá hạn mức tối đa do ngân hàng quy định',
    VALUE_EXCEEDED_LIMIT = 'Giá trị giao dịch vượt quá giới hạn tối đa do cổng thanh toán quy định',
    PENDING_FOR_PURCHASE = 'OTP đã được xác minh',
    AUTHENTICATION_FAILED = 'Xác thực thất bại',
    EXPIRED_SESSION = 'Hết phiên đăng nhập',
    UNREGISTERED_CARD = 'UNREGISTERED_CARD',
    CARD_LIMIT_EXCEEDED = 'Giao dịch vượt quá hạn mức hàng ngày do ngân hàng quy định',
    UNREGISTED_CARD = 'Thẻ chưa đăng ký thanh toán trực tuyến',
    INVALID_OTP = 'Mã OTP không hợp lệ ',
    INVALID_PASSWORD = 'Mật khẩu không hơp lệ',
    INVALID_OTP3 = 'Nhập OTP quá 3 lần',
    INVALID_OTP_1TIME = 'Mã OTP không hợp lệ ',
    OTP_TIMED_OUT = 'OTP hết hiệu lực',
    OTP_CONFIRM_NOT_FOUND = 'Không tồn tại giao dịch cần xác thực OTP',
    INVALID_CARDNO = 'Số thẻ không hợp lệ',
    INVALID_ISSDATE = 'Ngày phát hành không hợp lệ',
    INVALID_DATE = 'Ngày có hiệu lực không hợp lệ',
    PENDING_FOR_CARDVER = 'Thông tin thẻ chưa được xác minh',
    TRANSACTION_BELOW_LIMIT = 'Giá trị giao dịch không đáp ứng hạn mức tối thiểu do ngân hàng quy định',
    TRANSACTION_OUT_OF_LIMIT_BANK = 'Giá trị giao dịch vượt quá hạn mức  tối đa quy định của ngân hàng',
    UNDETERMINED_BALANCE = 'Số dư chưa xác định trong tài khoản của khách hàng',
    TRANSACTION_OUT_OF_LIMIT_PG = 'Giá trị giao dịch vượt quá giới hạn tối đa do cổng thanh toán quy định',
    CARD_ACCOUNT_NOT_ALLOWED = 'Thẻ/Tài khoản không được phép thanh toán',
    FINISHED_PAYMENT = 'Đơn hàng đã được thanh toán',
    ACCOUNT_PAY_NOT_ALLOWED = 'Giao dịch không được phép thực hiện',
    FASTPAY_NOT_ALLOWED = 'Giao dịch không được phép thực hiện',
    CARD_NOT_ALLOWED_FOR_TRANSACTION = 'Giao dịch không được phép thực hiện', 
    INVALID_ACCOUNT_INFO = 'Thông tin tài khoản không hợp lệ',
    ISSUER_RES_CODE_NOT_FOUND = 'Không nhận được phản hồi từ tổ chức phát hành',
    ISSUER_RES_CODE_DUPLICATE = 'Mã phản hồi của tổ chức phát hành bị trùng lặp',
    INVALID_ACC_NAME = 'Tên tài khoản không hợp lệ',
    FASTPAY_LIMIT_EXCEEDED = 'Giao dịc vượt quá hạn mức thanh toán nhanh',

    // ERROR card NAPAS
    OTHER_ERROR = 'Giao dịch thất bại',
    ORDERS_NOT_FOUND = 'Không tìm thấy đơn hàng',
    DUPLICATE_ORDERS = 'Đơn hàng bị trùng lặp',
    MC_ORDER_ID_DUPLICATE = 'Merchant Order ID duplicated',
    MC_TRANS_ID_DUPLICATE = 'Merchant Transaction ID duplicated',
    CANCEL = 'Giao dịch bị hủy bỏ',
    TOKEN_EXISTED = 'Token đã tồn tại',
    INVALID_INFO_FOR_CASHIN = 'Giao dịch nạp tiền không hợp lệ',
    INVALID_INFO_FOR_WHITELABEL = 'Invalid information for whitelabel transaction',
    INVALID_MERCHANT = 'Thông tin merchant không hợp lệ',
    INVALID_REQUEST = 'Yêu cầu không hợp lệ',
    INVALID_TOKEN = 'Token không hợp lệ',
    EXPIRED_ORDER = 'Đơn hàng hết hạn',
    BLACKLISTED_BIN = 'Giao dịch bị từ chối bởi bộ phận quản lý rủi ro ',
    BLACKLISTED_IP = 'Giao dịch bị từ chối bởi bộ phận quản lý rủi ro ',
    BIN_VELOCITY = 'Giao dịch bị từ chối bởi bộ phận quản lý rủi ro ',
    IP_VELOCITY = 'Giao dịch bị từ chối bởi bộ phận quản lý rủi ro ',
    MISSING_DATA = 'Transaction data is missing. For Refund API.',
    INVALID_DATA = 'Transaction data is invalid. For Refund API.',
    INVALID_AMOUNT = 'Transaction amount is invalid. For Refund API',
    TRANSACTION_NOT_FOUND = 'Original transaction not found. For Refund API',
    DUPLICATE_TRANSACTION = 'Duplicate transaction. For Refund API.',
    RF_OTHER_ERROR = 'Other error. For Refund API.',
    REFUND_TIMEOUT = 'Refund timeout. For Refund API.',
    ORIGINAL_TRANSACTION_FAIL = 'Original transaction is not successful. For Refund API.',
    EXCEEDING_REFUND_AMOUNT = 'Exceeding refund amount. For Refund API.',
    NOT_ALLOWED = 'Not allow to refund. For Refund API.',

    DEVICE_NOT_VALID = 'DEVICE_NOT_VALID',
    TRANSACTION_BALANCE_NOT_ENOUGH = 'Số dư của quý khách không đủ',
    TRANSACTION_RECEIPANT_NOT_VALID = 'Người nhận không hợp lệ',

    // Upload Avatar
    FILE_TOO_LARGE = 'FILE_TOO_LARGE',
    INVALID_FILE_FORMAT = 'INVALID_FILE_FORMAT',
    FILE_NOT_FOUND = 'FILE_NOT_FOUND',
    BANK_NOT_FOUND = 'BANK_NOT_FOUND',
    BANK_EXISTED = 'BANK_EXISTED',
    BANK_UNLINK_ERROR = 'BANK_UNLINK_ERROR',
    TOKEN_NOT_FOUND = 'Không tìm thấy thông tin token',

    // Client Order
    //ORDER_NOT_FOUND = 'ORDER_NOT_FOUND',
    NAPAS_ORDER_CHECKSUM_FAILED = 'Checksum failed',
    ORDER_REQUEST_UPDATED = 'Giao dịch đã thưc hiện',
    ERROR_UNKNOW = 'Lỗi không xác định',
    INFOR_VERIFICATION_ALREADY_EXIST = 'INFOR_VERIFICATION_ALREADY_EXIST',
    INFOR_VERIFICATION_FILE_NOT_FOUND = 'INFOR_VERIFICATION_FILE_NOT_FOUND',
    INFOR_VERIFICATION_NOT_EXIT = 'INFOR_VERIFICATION_NOT_EXIT',
    INFOR_VERIFICATION_HANDLED = 'INFOR_VERIFICATION_HANDLED',
    ACCOUNT_HAS_NOT_BEEN_ACTIVATED = 'ACCOUNT_HAS_NOT_BEEN_ACTIVATED',
    ACCOUNT_HAS_VERIFICATED = 'ACCOUNT_HAS_VERIFICATED',
    ACCOUNT_NOT_VERIFIED = 'ACCOUNT_NOT_VERIFIED',
    ACCOUNT_HAS_SENT_REQUEST = 'ACCOUNT_HAS_SENT_REQUEST',
    ACCOUNT_RECEIVER_IS_NOT_LINK_TO_BANK = 'ACCOUNT_RECEIVER_IS_NOT_LINK_TO_BANK',
    ACCOUNT_RECEIVER_IS_NOT_VERIFIED='ACCOUNT_RECEIVER_IS_NOT_VERIFIED',
    ACCOUNT_HAS_NOT_SENT_REQUEST = 'ACCOUNT_HAS_NOT_SENT_REQUEST',
    BIDV_LINK_REQUEST_FAILED = 'BIDV_LINK_REQUEST_FAILED',
    BANK_SIGNATURE_VERIFY_FAILED = 'BANK_SIGNATURE_VERIFY_FAILED',
    REQUEST_ID_NOTFOUND = 'REQUEST_ID_NOTFOUND',
    BILL_PAYMENT_CONFIRM_ID_NOTFOUND = 'BILL_PAYMENT_CONFIRM_ID_NOTFOUND',

    PAYMENT_LINK_NOT_FOUND = 'PAYMENT_LINK_NOT_FOUND',
    PAYMENT_LINK_NAPAS_ORDER_NOT_FOUND = 'Không tìm thấy yêu cầu tạo liên kết',
    PAYMENT_LINK_NAPAS_ORDER_MIN_AMOUNT = 'PAYMENT_LINK_NAPAS_ORDER_MIN_AMOUNT',
    PAYMENT_LINK_EXISTED = 'PAYMENT_LINK_EXISTED',
    PAYMENT_LINK_EXISTED_IN_SYSTEM = 'PAYMENT_LINK_EXISTED_IN_SYSTEM',
    PAYMENT_LINK_CANCEL = 'PAYMENT_LINK_CANCEL',
    PAYMENT_LINK_BANK_ERROR = 'PAYMENT_LINK_BANK_ERROR',
    PAYMENT_LINK_INSUFFICIENT_FUNDS = 'Số dư không đủ để thanh toán',
    PAYMENT_LINK_LOCKED_CARD = 'PAYMENT_LINK_LOCKED_CARD',
    PAYMENT_LINK_TIMEOUT = 'PAYMENT_LINK_TIMEOUT',
    PAYMENT_LINK_RESPONSE_INVALID_FORMAT = 'PAYMENT_LINK_RESPONSE_INVALID_FORMAT',
    PAYMENT_LINK_ERROR_SYSTEM = 'PAYMENT_LINK_ERROR_SYSTEM',
    PAYMENT_LINK_NOT_MATCH_IDENTITY = 'PAYMENT_LINK_NOT_MATCH_IDENTITY',
    PAYMENT_LINK_NOT_MATCH_PAYER_NAME = 'PAYMENT_LINK_NOT_MATCH_PAYER_NAME',

    CREDIT_LIMIT_PER_DAY = 'CREDIT_LIMIT_PER_DAY',
    CREDIT_LIMIT_PER_MONTH = 'CREDIT_LIMIT_PER_MONTH',
    CREDIT_LIMIT_PER_WEEK = 'CREDIT_LIMIT_PER_WEEK',
    CREDIT_LIMIT_PER_YEAR = 'CREDIT_LIMIT_PER_YEAR',
    CREDIT_LIMIT_TURN_PER_DAY = 'CREDIT_LIMIT_TURN_PER_DAY',
    CREDIT_LIMIT_TURN_PER_WEEK = 'CREDIT_LIMIT_TURN_PER_WEEK',
    CREDIT_LIMIT_TURN_PER_MONT = 'CREDIT_LIMIT_TURN_PER_MONTH',
    CREDIT_LIMIT_TURN_PER_YEAR = 'CREDIT_LIMIT_TURN_PER_YEAR',

    PRODUCT_DISCOUNT_NOT_FOUND = 'PRODUCT_DISCOUNT_NOT_FOUND',
    END_DATE_LESS_THAN_START_DATE = 'END_DATE_LESS_THAN_START_DATE',

    FREEZE_AVAILABLE_NOT_ENOUGH = 'FREEZE_AVAILABLE_NOT_ENOUGH',

    FORGOT_PASSWORD_INVALID_IDENTITY = 'FORGOT_PASSWORD_INVALID_IDENTITY',
    FORGOT_PASSWORD_INVALID_BANK_DATA = 'FORGOT_PASSWORD_INVALID_BANK_DATA',
    FORGOT_PASSWORD_NOT_VALID = 'FORGOT_PASSWORD_NOT_VALID',
    NOTIFICATION_NOT_FOUND = 'NOTIFICATION_NOT_FOUND',
    SALE_FEE_NOT_FOUND = 'SALE_FEE_NOT_FOUND',

    FULL_LOGO_BANK_TOO_BIG = 'FULL_LOGO_BANK_TOO_BIG',
    FULL_LOGO_BANK_INVALID_FORMAT = 'FULL_LOGO_BANK_INVALID_FORMAT',
    SHORT_LOGO_BANK_TOO_BIG = 'SHORT_LOGO_BANK_TOO_BIG',
    SHORT_LOGO_BANK_INVALID_FORMAT = 'SHORT_LOGO_BANK_INVALID_FORMAT',

    BILL_PAYMENT_NOT_FOUND = 'BILL_PAYMENT_NOT_FOUND',
    BILL_PAYMENT_REQUEST_TIMEOUT = 'BILL_PAYMENT_REQUEST_TIMEOUT',
    BILL_PAYMENT_RESPONSE_INVALID_FORMAT = 'BILL_PAYMENT_RESPONSE_INVALID_FORMAT',
    BILL_PAYMENT_RESPONSE_SIGNATURE_NOT_VALID = 'BILL_PAYMENT_RESPONSE_SIGNATURE_NOT_VALID',
    BILL_PAYMENT_BY_LINK_ERROR = 'BILL_PAYMENT_BY_LINK_ERROR',
    NOT_APPLICABLE_OBJECT = 'NOT_APPLICABLE_OBJECT',
    NOT_CHOOSE_ACCOUNT_GROUP = 'NOT_CHOOSE_ACCOUNT_GROUP',

    SSC_AMOUNT_INVALID = 'SSC_AMOUNT_INVALID',

    NOT_CHOOSE_OMIPAYACOUNT = 'NOT_CHOOSE_OMIPAYACOUNT',
    NOT_CHOOSE_DEPOSIT_METHOD = 'NOT_CHOOSE_DEPOSIT_METHOD',
    TRANSFER_MAX_LESS_THAN_TRANSFER_MIN = 'TRANSFER_MAX_LESS_THAN_TRANSFER_MIN',
    NOT_SET_FEE = 'NOT_SET_FEE',
    RANGE_FEE_HAS_GAP = 'RANGE_FEE_HAS_GAP',
    FLEXIBALE_FEE_ERROR = 'FLEXIBALE_FEE_ERROR',
    FIXED_FEE_ERROR = 'FIXED_FEE_ERROR',
    FEE_MIN_ERROR = 'FEE_MIN_ERROR',
    FEE_MAX_LESS_THAN_FEE_MIN = 'FEE_MAX_LESS_THAN_FEE_MIN',
    START_DATE_NOT_VALID = 'START_DATE_NOT_VALID',
    NOT_SET_START_DATE = 'NOT_SET_START_DATE',
    NOT_SET_END_DATE_EVENT = 'NOT_SET_END_DATE_EVENT',
    NOT_SET_MULTI_FOR_CUSTOMER = 'NOT_SET_MULTI_FOR_CUSTOMER',

    SYSTEM_FEE_MANAGEMENT_NOT_FOUND = 'SYSTEM_FEE_MANAGEMENT_NOT_FOUND',
    ACCOUNT_GROUP_NOT_FOUND = 'ACCOUNT_GROUP_NOT_FOUND',
    PRODUCT_IS_AVAILABLE = 'PRODUCT_IS_AVAILABLE',
    BANK_IS_ACTIVE = 'BANK_IS_ACTIVE',

    CUSTOMER_NOT_VERIFIED = 'CUSTOMER_NOT_VERIFIED',
    BANK_NAME_AVAILABLE = 'BANK_NAME_AVAILABE',
    BANK_TRADING_NAME_AVAILABLE = 'BANK_TRADING_NAME_AVAILABLE',
    BANK_CODE_AVAILABLE = 'BANK_CODE_AVAILABLE',
    PRIORITY_REQUIRED = 'PRIORITY_REQUIRED',
    TRANSACTION_LIMIT_NOT_FOUND = 'TRANSACTION_LIMIT_NOT_FOUND',
    NOT_LINKED_DIRECTLY = 'NOT_LINKED_DIRECTLY',

    NOTIFICATION_CONTEXT_NOT_FOUND = 'NOTIFICATION_CONTEXT_NOT_FOUND',
    EMAIL_INVALID = 'EMAIL_INVALID',

    TRANSACTION_TRANSFER_BY_LINK_ERROR = 'TRANSACTION_TRANSFER_BY_LINK_ERROR',
    TRANSACTION_REFUND_SOURCE_NOT_FOUND = 'TRANSACTION_REFUND_SOURCE_NOT_FOUND',
    TRANSACTION_REFUNDED = 'TRANSACTION_REFUNDED',
    TRANSACTION_CASHOUT = 'TRANSACTION_CASHOUT',

    ACCOUNT_IS_NOT_VERIFIED = 'ACCOUNT_IS_NOT_VERIFIED',

    GROUP_IS_EXITS = 'GROUP_IS_EXITS',
    SERVICE_NOT_FOUND = 'SERVICE_NOT_FOUND',

    GROUP_NOT_EXITS = 'GROUP_NOT_EXITS',

    PRODUCT_DISCOUNT_INVALID_INTO_MONEY = 'PRODUCT_DISCOUNT_INVALID_INTO_MONEY',
    GATEWAY_NULL_EXCEPTION = 'GATEWAY_NULL_EXCEPTION',

    // Error for Transfer
    TRANSACTION_CACHE_NOT_FOUND = 'TRANSACTION_CACHE_NOT_FOUND',
    TRANSACTION_CONFIRM_OTP_NOT_FOUND = 'TRANSACTION_CONFIRM_OTP_NOT_FOUND',


    EKYC_SERVICE_CHANNEL_EXISTED = 'EKYC_SERVICE_CHANNEL_EXISTED',
    EKYC_SERVICE_CHANNEL_NOT_EXISTED = 'EKYC_SERVICE_CHANNEL_NOT_EXISTED',

    //Error for Bank Deep Link
    BANK_DEEP_LINK_NOT_EXIST = "BANK_DEEP_LINK_NOT_EXIST",
    BANK_DEEP_LINK_NOT_FOUND = "BANK_DEEP_LINK_NOT_FOUND",

    //Refund
    REFUND_UPLOAD_FILE_NOT_EXIT = "REFUND_UPLOAD_FILE_NOT_EXIT"
}

export enum TraceErrorType {
    UNKNOWN_ERR = 'UNKNOWN_ERR',
    FAILURE_PAYMENTLINK_FROM_BANK = 'FAILURE_PAYMENTLINK_FROM_BANK',
    FAILURE_TRANSACTION_FROM_BANK = 'FAILURE_TRANSACTION_FROM_BANK',
    FAILURE_CREATE_LINK_PAYMENT_FROM_BANK = 'FAILURE_CREATE_LINK_PAYMENT_FROM_BANK',
    FAILURE_OTP_CONFIRM_FROM_BANK = 'FAILURE_OTP_CONFIRM_FROM_BANK',
    FAILURE_UNLINK_FROM_BANK = 'FAILURE_UNLINK_PAYMENT_FROM_BANK',
    FAILURE_TRANSACTION_INTERNAL = 'FAILURE_TRANSACTION_INTERNAL',
    FAILURE_LINK_PAYMENT_INTERNAL = 'FAILURE_LINK_PAYMENT_INTERNAL',
    FAILURE_ORDER_INTERNAL = 'FAILURE_ORDER_INTERNAL',
    FAILURE_ORDER_EXTERNAL = 'FAILURE_ORDER_EXTERNAL',
    FAILURE_EKYC_INTERNAL = 'FAILURE_EKYC_INTERNAL',
    FAILURE_EKYC_EXTERNAL = 'FAILURE_EKYC_EXTERNAL',
}

export enum ErrorCtx {
    FROM_MOB = 'FROM_MOB',
    BANK_TRANSACTION = 'BANK_TRANSACTION',
}
