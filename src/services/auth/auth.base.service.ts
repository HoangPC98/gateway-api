import { ForbiddenException, Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtSignOptions } from '@nestjs/jwt/dist/interfaces';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

import * as ms from 'ms';
import { v4 as uuidv4 } from 'uuid';

import { AppConfigService } from 'src/configs/app.config.service';
import { UsersRepository } from 'src/database/repositories/user.repository';
import { UserAuthJwtDto } from './dto/token.dto';
import { User } from 'src/entities/user-entity/user.entity';
import { ErrorMessage } from 'src/common/enums/error.enum';
import { WRONG_PASSWORD_ATTEMPT_REMAIN_CKEY, WRONG_PASSWORD_COUNT } from 'src/common/constants/cache-key.constant';
import { CacheProvider } from 'src/providers/cache/cache.provider';
import { ILoggerService } from 'src/common/logger/adapter';
import { EUserReasonLockType } from 'src/common/enums/auth.enum';
import { UserAuthJwtPayload } from 'src/common/types/auth.type';
import { BOOLEAN_VALUE, TOKEN_TYPE } from 'src/common/enums/index.enum';
import { IClientJwtPayload, IGetTokenRes } from 'src/common/interfaces/auth.interface';
import { Session } from 'src/entities/user-entity/session.entity';

dotenv.config();

@Injectable()
export class AuthBaseService {
  private readonly jwtAccessTokenOption: JwtSignOptions = {};
  private readonly jwtRefreshTokenOption: JwtSignOptions = {};
  private isLowSecureForTesting: boolean = true;
  private readonly maxWrongPasswordAttempts = 5;
  private readonly tempLockDuration = 30 * 60 * 1000;

  constructor(
    public readonly userRepository: UsersRepository,
    public readonly jwtService: JwtService,
    public readonly appConfigService: AppConfigService,
    public readonly cacheProvider: CacheProvider,
    // public readonly logger: ILoggerService,
  ) {
    this.jwtAccessTokenOption = this.appConfigService.accessTokenOption;
    this.jwtRefreshTokenOption = this.appConfigService.refreshTokenOption;
    this.isLowSecureForTesting =
      process.env.LOW_SECURE_FOR_TESTING && process.env.LOW_SECURE_FOR_TESTING.toString() == 'true' ? true : false;
  }

  public async handleLoginCredit(user: User, password: string): Promise<void> {
    const passwordMatch = await bcrypt.compare(password, user.password);
    const isTempLocked = user.state?.isTempLock == true || false;
    const isLocked = user.state?.isLock == true || false;
    const ckey = `${WRONG_PASSWORD_COUNT}${user.id}`;
    if (isLocked || user.isDeleted()) {
      throw new ForbiddenException(ErrorMessage.USER_IS_TEMP_LOCK);
    }

    if (isTempLocked) {
      throw new ForbiddenException(ErrorMessage.USER_IS_TEMP_LOCK);
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
          await this.userRepository.account.update(user.id, {
            state: {
              reasonLockType: EUserReasonLockType.WRONG_PASSWORD_TO_MUCH,
            },
          });
          throw new ForbiddenException(reasonLock);
        } else {
          reasonLock = ErrorMessage.USER_IS_TEMP_LOCK;
          await this.cacheProvider.del(ckey);
          await this.userRepository.account.update(user.id, {
            state: {
              isTempLock: true,
              lockAt: new Date(),
              reasonLockType: EUserReasonLockType.WRONG_PASSWORD_TO_MUCH,
              reasonLockDesc: reasonLock,
            },
          });
          throw new ForbiddenException(reasonLock);
        }
      } else {
        await this.cacheProvider.set(ckey, currentCount + 1, this.tempLockDuration);
        throw new ForbiddenException(`Wrong password many time, attempt remaining : ${remainingCount}`);
      }
    }
  }

  async validateSession(uid: number, sid: string, token?: string): Promise<boolean> {
    const sessionFromC = await this.cacheProvider.getSession(sid, uid);
    if (!sessionFromC || sessionFromC?.expried_at) {
      return false;
    }
    return true;
  }

  generateNewSid() {
    return `sid:${Date.now()}`;
  }

  async createNewSession(uid: number, accessToken: string, sid: string, deviceId?: string): Promise<Session> {
    const newSession = this.userRepository.session.create({
      id: sid,
      uid: uid,
      access_token: accessToken,
      device_id: deviceId || null
    });
    await this.userRepository.session.save(newSession);
    await this.cacheProvider.storeSession(newSession);
    return newSession;
  }

  async getClientTokens(user: User, sid: string): Promise<IGetTokenRes> {
    const accessTokenPayload: IClientJwtPayload = {
      uid: user.id,
      active: user.active,
      sid: sid
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

  setPasswordHash(plainPassword: string): string {
    const salt: string = bcrypt.genSaltSync();
    return bcrypt.hashSync(plainPassword, salt);
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
}
