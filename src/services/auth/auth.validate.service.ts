import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtSignOptions } from '@nestjs/jwt/dist/interfaces';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import * as dotenv from 'dotenv';
import { AuthException, AuthType, Customer, DB_BOOLEAN_VALUE, EntityType, TOKEN_TYPE } from 'libs/common/src';
import {
    CacheProvider,
    CustomerDetailDto,
    CustomerRepository,
    ILoggerService,
    NotificationRepository,
} from 'libs/modules/src';
import * as ms from 'ms';
import { v4 as uuidv4 } from 'uuid';


import { CustomerAuthPayloadInterface, RefreshTokenPayload } from './interfaces/auth-payload.interface';
import { AppConfigService } from 'src/configs/app.config.service';
import { MyCacheService } from 'src/infra-mudules/cache/cache.service';

dotenv.config();

@Injectable()
export class AuthService {
    private readonly jwtAccessTokenOption: JwtSignOptions = {};
    private readonly jwtRefreshTokenOption: JwtSignOptions = {};
    private readonly jwtRefreshTokenHashKey: string;
    private readonly jwtRefreshTokenLifeTime: number;
    private isLowSecureForTesting: boolean = true;

    constructor(
        private readonly customerRepository: CustomerRepository,
        private readonly jwtService: JwtService,
        private readonly appConfigService: AppConfigService,
        private readonly cacheProvider: CacheProvider,
        private readonly cacheService: MyCacheService,
        private readonly logger: ILoggerService,
        private notificationRepository: NotificationRepository,
    ) {
        this.jwtAccessTokenOption = this.appConfigService.accessTokenOption;
        this.jwtRefreshTokenOption = this.appConfigService.refreshTokenOption;
        this.jwtRefreshTokenLifeTime = ms(this.jwtRefreshTokenOption.expiresIn);
        this.isLowSecureForTesting =
            (process.env.LOW_SECURE_FOR_TESTING && (process.env.LOW_SECURE_FOR_TESTING).toString() == 'true') ? true : false;
    }

    async validateToken(
        entityId: number,
        jwtId: string,
        deviceId: string,
        tokenType: TOKEN_TYPE = TOKEN_TYPE.ACCESS_TOKEN,
    ): Promise<CustomerDetailDto> {
        const customer: Customer = await this.customerRepository.findByIdAndWithDeviceAndSecuritySetting(entityId);
        if (customer === null) {
            throw new UnauthorizedException();
        }
        const currentDeviceId = customer?.device?.deviceId;
        if (currentDeviceId === null) {
            return null;
        }
        if (currentDeviceId !== deviceId && tokenType === TOKEN_TYPE.ACCESS_TOKEN && !this.isLowSecureForTesting) {
            throw AuthException.loginNewDevice();
        }
        customer.totalNotification = await this.notificationRepository.countNotification(customer.id);
        const cacheKey =
            tokenType === TOKEN_TYPE.REFRESH_TOKEN
                ? this.cacheProvider.getRefreshTokenCacheKey(customer.id)
                : this.cacheProvider.getAccessTokenCacheKey(customer.id);
        const cacheValue = (await this.cacheProvider.get(cacheKey)) as string;
        if (cacheValue === null || cacheValue === undefined) {
            return null;
        }
        const compareCache = await bcrypt.compare(jwtId, cacheValue);
        if (!compareCache) {
            throw new UnauthorizedException();
        }
        return plainToInstance(CustomerDetailDto, customer);
    }

    async generateClientAccessToken(payload: CustomerAuthPayloadInterface): Promise<string> {
        const token = this.jwtService.sign(
            { ...payload, authType: AuthType.CLIENT, entity: EntityType.CUSTOMER },
            this.jwtAccessTokenOption,
        );
        return token;
    }

    async generateClientRefreshToken(payload: RefreshTokenPayload): Promise<string> {
        const token = this.jwtService.sign(payload, this.jwtRefreshTokenOption);
        await this.cacheService.setLoginSession({
            uid: payload.
        })
        return token;
    }

    async refreshToken(customer: CustomerDetailDto, currentDeviceId: string): Promise<RefreshTokenResponse> {
        const cacheKey = this.cacheProvider.getRefreshTokenCacheKey(customer.id);
        const tokenHashed = await this.cacheProvider.get(cacheKey);
        if (tokenHashed === null) {
            throw new UnauthorizedException();
        }
        if (typeof tokenHashed === 'string') {
            const verified = await bcrypt.compare(customer.jwtId, tokenHashed);
            if (!verified) {
                throw new UnauthorizedException();
            }
        }
        const accessTokenId = uuidv4();
        const payload = {
            userId: customer.id,
            entity: EntityType.CUSTOMER,
            jwtId: accessTokenId,
            deviceId: currentDeviceId,
        };
        const token = await this.generateClientAccessToken(payload);
        const refreshToken = await this.generateClientRefreshToken(payload);
        return {
            accessToken: token,
            refreshToken,
        };
    }

    async logout(customer: Customer): Promise<any> {
        this.logger.info({
            message: `Customer id: ${customer.id} logout, Customer: ${customer.phoneNumber}`,
            context: AuthService.name,
        });
        const accessCacheKey = this.cacheProvider.getAccessTokenCacheKey(customer.id);
        const refreshCacheKey = this.cacheProvider.getRefreshTokenCacheKey(customer.id);
        await this.customerRepository.update({ id: customer.id }, { isLogout: DB_BOOLEAN_VALUE.TRUE });
        await Promise.all([this.cacheProvider.del(accessCacheKey), this.cacheProvider.del(refreshCacheKey)]);
        // return true;
    }

    async storeSessionToCache(userId: number, jwtId: string): Promise<void> {
        const accessCacheKey = this.cacheProvider.getAccessTokenCacheKey(userId);
        const hashedToken = await this.hashToken(jwtId);
        await this.cacheProvider.set(accessCacheKey, hashedToken, {
            ttl: ms(this.appConfigService.jwtRefreshTokenExpired) / 1000,
        });
    }

    async hashToken(token: string): Promise<string> {
        const salt: string = bcrypt.genSaltSync();
        return bcrypt.hashSync(token, salt);
    }
}





