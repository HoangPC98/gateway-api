export type SessionCachePL = {
    uid: string;
    deviceId: string;
    refreshToken: string;
    fcmToken: string;
    lastUsedAt: string;
    deviceInfo?: string;
}