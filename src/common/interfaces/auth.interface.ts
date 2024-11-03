export interface IUserAuthPayload {
  authType: 'admin' | 'client';
  userId: number;
  jwtId: string;
  entity: string;
}

export interface IOtpTracking {
  trackingId: string;
  otpCode: string;
  secretKey?: string;
  usageLimit?: string;
}

export interface IGetTokenResp {
  accessToken: string;
  refreshToken: string;
}
