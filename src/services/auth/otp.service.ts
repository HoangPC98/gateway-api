import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import * as dotEnv from 'dotenv';
import { OtpException, OtpTracking } from 'libs/common/src';
import * as otpGenerator from 'otp-generator';
import { v4 as uuidv4 } from 'uuid';

dotEnv.config();

@Injectable()
export class OtpProvider {
    // Thời gian OTP hết hiệu lực
    private readonly otpExpireTime: number = Number.parseInt(process.env.OTP_EXPIRE_TIME);
    private readonly maxOtpOnTime: number = Number.parseInt(process.env.OTP_LIMIT_ON_TIME);
    private readonly otpIsByPass: string = process.env.OTP_BY_PASS;
    private readonly otpCodeBypassDf: string = process.env.OTP_CODE_BYPASS_DF || null;
    // Thời gian OTP được lưu trữ lại để kiểm tra
    private readonly otpLiveTime: number = Number.parseInt(process.env.OTP_STORE_TIME);

    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    public async validate(phoneNumber: string, otp: string, trackingId: string): Promise<boolean> {
        const otpByPassPhoneNumber = process.env.OTP_BY_PASS_PHONE_NUMBER;
        
        if(this.otpCodeBypassDf != null && otp !== this.otpCodeBypassDf)
            return false;
        if (this.otpIsByPass.toString().toLowerCase() === 'true')
            return true;
        if (otpByPassPhoneNumber?.includes(phoneNumber)) {
            return true;
        }
        const cachedKey = this.otpCacheKey(phoneNumber);
        const cacheOtpData: OtpTracking = await this.cacheManager.get(cachedKey);

        const otpLiveTimeCache = this.otpLiveTimeCacheKey(otp);
        const cachedOtpLiveTime: OtpTracking = await this.cacheManager.get(otpLiveTimeCache);

        if (!cacheOtpData && cachedOtpLiveTime) {
            throw OtpException.otpExpired();
        }
        if (!cacheOtpData) {
            return false;
        }
        const cacheOtp = cacheOtpData?.otpCode;
        const cacheTrackingId = cacheOtpData?.trackingId;
        if (otp === cacheOtp && trackingId === cacheTrackingId) {
            const otpLiveTime = this.otpLiveTimeCacheKey(otp);
            await Promise.all([this.cacheManager.del(cachedKey), this.cacheManager.del(otpLiveTime)]);
            return true;
        }

        return false;
    }

    // key = phoneNumber or email
    public async generateOtpCode(phoneNumber: string, limit: number): Promise<OtpTracking> {
        const otpLimitKey = this.otpLimitCacheKey(phoneNumber);
        let totalOtp: number = Number.parseInt(await this.cacheManager.get(otpLimitKey)) || 0;
        if (totalOtp >= limit) {
            throw OtpException.maxOtpOnTime();
        }
        await this.cacheManager.set(otpLimitKey, ++totalOtp, this.maxOtpOnTime );
        return this.generate(phoneNumber);
    }

    // generateOtp v2
    public async generateOtpV2(phoneNumber: string, limit: number): Promise<OtpTracking> {
        const otpLimitKey = this.otpLimitCacheKey(phoneNumber);
        let totalOtp: number = Number.parseInt(await this.cacheManager.get(otpLimitKey)) || 0;
        if (totalOtp >= limit) {
            throw OtpException.maxOtpOnTime();
        }
        await this.cacheManager.set(otpLimitKey, ++totalOtp, this.maxOtpOnTime );
        return this.generate(phoneNumber);
    }

    private async generate(key: string): Promise<OtpTracking> {
        const otpTracking: OtpTracking = {
            trackingId: uuidv4(),
            otpCode: this.generateOtp(),
        };
        await this.saveOtpDataToCache(key, otpTracking);
        return otpTracking;
    }

    private async saveOtpDataToCache(phoneNumber: string, otpTracking: OtpTracking): Promise<void> {
        const otpKey = this.otpCacheKey(phoneNumber);
        const otpLiveTime = this.otpLiveTimeCacheKey(otpTracking.otpCode);
        const cacheOtpData: OtpTracking = await this.cacheManager.get(otpKey);
        if (cacheOtpData) {
            await this.cacheManager.del(otpKey);
        }
        await Promise.all([
            this.cacheManager.set(otpKey, otpTracking, this.otpExpireTime),
            this.cacheManager.set(otpLiveTime, otpTracking.trackingId, this.otpLiveTime),
        ]);
    }

    private generateOtp(): string {
        const otp = otpGenerator.generate(6, {
            digits: true,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
        });
        return otp.toString();
    }

    private otpCacheKey(phoneNumber: string): string {
        return `${phoneNumber}_otp_cache`;
    }

    private otpLimitCacheKey(key: string): string {
        return `${key}_total_otp`;
    }

    private otpLiveTimeCacheKey(otp: string): string {
        return `${otp}_live_time`;
    }
}
