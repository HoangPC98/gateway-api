import { Global, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtSignOptions } from '@nestjs/jwt';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class AppConfigService extends ConfigService {
  get env(): string {
    return process.env.APP_ENV;
  }

  get basePath(): string {
    return process.env.API_BASE_PATH;
  }

  get name(): string {
    return process.env.APP_NAME;
  }

  get url(): string {
    return process.env.APP_URL;
  }

  get jwtAccessTokenSecret(): string {
    return process.env.JWT_ATOKEN_SECRET;
  }

  get jwtAccessTokenExpired(): string {
    return process.env.JWT_ATOKEN_EXPIRED_IN;
  }

  get jwtRefreshTokenSecret(): string {
    return process.env.JWT_RTOKEN_SECRET;
  }

  get jwtRefreshTokenExpired(): string {
    return process.env.JWT_RTOKEN_EXPIRED_IN;
  }

  get accessTokenOption(): JwtSignOptions {
    return {
      secret: this.jwtAccessTokenSecret,
      expiresIn: this.jwtAccessTokenExpired,
    };
  }

  get refreshTokenOption(): JwtSignOptions {
    return {
      secret: this.jwtAccessTokenSecret,
      expiresIn: this.jwtRefreshTokenExpired,
    };
  }
}
