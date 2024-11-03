export enum ELoginType {
  USRPWD = 0,
  GOOGLE = 1,
  FACEBOOK = 2,
}

export enum UsrType {
  EMAIL = 'EMAIL',
  PHONE = 'PHONE_NUMBER',
  OAUTH = 'OAUTH',
}

export enum ETokenType {
  ACCESS_TOKEN = 'ACCESS_TOKEN',
  REFRESH_TOKEN = 'REFRESH_TOKEN',
}

export enum EUserReasonLockType {
  WRONG_PASSWORD_TO_MUCH = 'WRONG_PASSWORD_TO_MUCH',
  CHEAT = 'CHEAT',
  SCAM = 'SCAM',
}
