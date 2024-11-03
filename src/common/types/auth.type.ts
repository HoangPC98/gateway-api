import { EUserReasonLockType } from '../enums/auth.enum';
import { EUserActive } from '../enums/user.enum';

export type SessionCachePL = {
  uid: string;
  deviceId: string;
  refreshToken: string;
  fcmToken: string;
  lastUsedAt: string;
  deviceInfo?: string;
};

export type UserState = {
  isLock: boolean;
  isTempLock: boolean;
  isNewCustomer: boolean;
  reasonLockType?: EUserReasonLockType;
  reasonLockDesc?: string;
};

export type UserAuthJwtPayload = {
  uid: number | string;
  active: EUserActive;
  state: UserState;
  lastLoginAt?: string | Date;
  email?: string;
  phone?: string;
};
