export interface IClientJwtPayload {
  uid: number;
  sid: string;
  active: number;
  device_id?: string;
}

export interface IOtpTracking {
  trackingId: string;
  otpCode: string;
  secretKey?: string;
  usageLimit?: string;
}

export interface IGetTokenRes {
  accessToken: string;
  refreshToken: string;
}

export interface ILoginResp extends IGetTokenRes {
  sid: string;
  userType: 'admin' | 'client';
  fcm_token?: string;
  session_expired_in?: string;
}
