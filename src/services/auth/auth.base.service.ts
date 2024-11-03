import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtSignOptions } from '@nestjs/jwt/dist/interfaces';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

import * as ms from 'ms';
import { v4 as uuidv4 } from 'uuid';

import { AppConfigService } from 'src/configs/app.config.service';
import { UserRepository } from 'src/database/repositories/user.repository';
import { UserAuthJwtDto } from './dto/token.dto';
import { User } from 'src/entities/user-entity/user.entity';
import { ErrorMessage } from 'src/common/enums/error.enum';
import { WRONG_PASSWORD_ATTEMPT_REMAIN_CKEY, WRONG_PASSWORD_COUNT } from 'src/common/constants/cache-key.constant';
import { CacheProvider } from 'src/providers/cache/cache.provider';
import { ILoggerService } from 'src/common/logger/adapter';
import { EUserReasonLockType } from 'src/common/enums/auth.enum';
import { UserAuthJwtPayload } from 'src/common/types/auth.type';
import { BOOLEAN_VALUE } from 'src/common/enums/index.enum';
import { IGetTokenResp } from 'src/common/interfaces/auth.interface';

dotenv.config();

@Injectable()
export class AuthBaseService {
  private readonly jwtAccessTokenOption: JwtSignOptions = {};
  private readonly jwtRefreshTokenOption: JwtSignOptions = {};
  private readonly jwtRefreshTokenHashKey: string;
  private readonly jwtRefreshTokenLifeTime: number;
  private isLowSecureForTesting: boolean = true;
  private readonly maxWrongPasswordAttempts = 5;
  private readonly tempLockDuration = 30 * 60;

  constructor(
    public readonly userRepo: UserRepository,
    public readonly jwtService: JwtService,
    public readonly appConfigService: AppConfigService,
    public readonly cacheProvider: CacheProvider,
    // public readonly logger: ILoggerService,
  ) {
    this.jwtAccessTokenOption = this.appConfigService.accessTokenOption;
    this.jwtRefreshTokenOption = this.appConfigService.refreshTokenOption;
    this.jwtRefreshTokenLifeTime = +this.jwtRefreshTokenOption.expiresIn;
    this.isLowSecureForTesting =
      process.env.LOW_SECURE_FOR_TESTING && process.env.LOW_SECURE_FOR_TESTING.toString() == 'true' ? true : false;
  }

  public async handleLoginCredit(user: User, password: string) {
    const passwordMatch = await bcrypt.compare(password, user.password);
    const isTempLocked = user.state.isTempLock == true;
    const isLocked = user.state.isLock == true;
    const ckey = `${WRONG_PASSWORD_COUNT}${user.id}`;
    if (isLocked || user.isDeleted()) {
      throw new ForbiddenException(ErrorMessage.USER_IS_TEMP_LOCK);
    }

    if (isTempLocked) {
    }
    if (!passwordMatch) {
      let currentCount = +(await this.cacheProvider.get(ckey));
      if (!currentCount) {
        currentCount = 0;
      }
      const remainingCount = this.maxWrongPasswordAttempts - (currentCount + 1);
      let reasonLock = '';
      if (remainingCount <= 0) {
        if (isTempLocked) {
          reasonLock = EUserReasonLockType.WRONG_PASSWORD_TO_MUCH;
          await this.userRepo.update(user.id, {
            state: {
              lockedAt: new Date(),
              reasonLockType: EUserReasonLockType.WRONG_PASSWORD_TO_MUCH,
            },
          });
          throw new ForbiddenException(ErrorMessage.USER_IS_TEMP_LOCK);
        }
      } else {
        await this.cacheProvider.set(ckey, currentCount + 1, this.tempLockDuration);
        throw new ForbiddenException(`Wrong password many time, attempt remaining : ${remainingCount}`);
      }
    }
  }

  async getClientTokens(user: User): Promise<IGetTokenResp> {
    const accessTokenPayload: UserAuthJwtPayload = {
      uid: user.id,
      active: user.active,
      state: user.state,
    };

    const refreshTokenPayload: UserAuthJwtPayload = {
      uid: user.id,
      active: user.active,
      state: user.state,
      lastLoginAt: null,
    };

    const accessToken = this.jwtService.sign(accessTokenPayload, this.jwtAccessTokenOption);
    const refreshToken = this.jwtService.sign(refreshTokenPayload, this.jwtRefreshTokenOption);
    return { accessToken, refreshToken };
  }

  // async generateClientRefreshToken(payload: RefreshTokenPayload): Promise<string> {
  //     const token = this.jwtService.sign(payload, this.jwtRefreshTokenOption);
  //     await this.cacheService.setLoginSession({
  //         uid: payload
  //     })
  //     return token;
  // }

  // async refreshToken(customer: CustomerDetailDto, currentDeviceId: string): Promise<RefreshTokenResponse> {
  //     const cacheKey = this.cacheProvider.getRefreshTokenCacheKey(customer.id);
  //     const tokenHashed = await this.cacheProvider.get(cacheKey);
  //     if (tokenHashed === null) {
  //         throw new UnauthorizedException();
  //     }
  //     if (typeof tokenHashed === 'string') {
  //         const verified = await bcrypt.compare(customer.jwtId, tokenHashed);
  //         if (!verified) {
  //             throw new UnauthorizedException();
  //         }
  //     }
  //     const accessTokenId = uuidv4();
  //     const payload = {
  //         userId: customer.id,
  //         entity: EntityType.CUSTOMER,
  //         jwtId: accessTokenId,
  //         deviceId: currentDeviceId,
  //     };
  //     const token = await this.generateClientAccessToken(payload);
  //     const refreshToken = await this.generateClientRefreshToken(payload);
  //     return {
  //         accessToken: token,
  //         refreshToken,
  //     };
  // }

  // async validateToken(
  //     entityId: number,
  //     jwtId: string,
  //     deviceId: string,
  //     tokenType: TOKEN_TYPE = TOKEN_TYPE.ACCESS_TOKEN,
  // ): Promise<CustomerDetailDto> {
  //     const customer: Customer = await this.customerRepository.findByIdAndWithDeviceAndSecuritySetting(entityId);
  //     if (customer === null) {
  //         throw new UnauthorizedException();
  //     }
  //     const currentDeviceId = customer?.device?.deviceId;
  //     if (currentDeviceId === null) {
  //         return null;
  //     }
  //     if (currentDeviceId !== deviceId && tokenType === TOKEN_TYPE.ACCESS_TOKEN && !this.isLowSecureForTesting) {
  //         throw AuthException.loginNewDevice();
  //     }
  //     customer.totalNotification = await this.notificationRepository.countNotification(customer.id);
  //     const cacheKey =
  //         tokenType === TOKEN_TYPE.REFRESH_TOKEN
  //             ? this.cacheProvider.getRefreshTokenCacheKey(customer.id)
  //             : this.cacheProvider.getAccessTokenCacheKey(customer.id);
  //     const cacheValue = (await this.cacheProvider.get(cacheKey)) as string;
  //     if (cacheValue === null || cacheValue === undefined) {
  //         return null;
  //     }
  //     const compareCache = await bcrypt.compare(jwtId, cacheValue);
  //     if (!compareCache) {
  //         throw new UnauthorizedException();
  //     }
  //     return plainToInstance(CustomerDetailDto, customer);
  // }

  // async storeSessionToCache(userId: number, jwtId: string): Promise<void> {
  //     const accessCacheKey = this.cacheProvider.getAccessTokenCacheKey(userId);
  //     const hashedToken = await this.hashToken(jwtId);
  //     await this.cacheProvider.set(accessCacheKey, hashedToken, {
  //         ttl: ms(this.appConfigService.jwtRefreshTokenExpired) / 1000,
  //     });
  // }

  // async hashToken(token: string): Promise<string> {
  //     const salt: string = bcrypt.genSaltSync();
  //     return bcrypt.hashSync(token, salt);
  // }
}
