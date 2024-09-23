import { Injectable } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';
import { JwtSignOptions } from "@nestjs/jwt";


@Injectable()
export class AppConfigService extends ConfigService {
    get env(): string {
        return this.get<string>('app.APP_ENV');
    }

    get basePath(): string {
        return this.get<string>('app.API_BASE_PATH');
    }

    get name(): string {
        return this.get<string>('app.APP_NAME');
    }

    get url(): string {
        return this.get<string>('app.APP_URL');
    }

    get jwtSecretKey(): string {
        return this.get<string>('app.JWT_ATOKEN_SECRET');
    }

    get jwtAccessTokenExpired(): string {
        return this.get<string>('app.JWT_ATOKEN_EXPIRED');
    }

    get jwtRefreshTokenSecret(): string {
        return this.get<string>('app.JWT_RTOKEN_SECRET');
    }
 
    get jwtRefreshTokenExpired(): string {
        return this.get<string>('app.JWT_RTOKEN_EXPIRED');
    }
    
    get accessTokenOption(): JwtSignOptions {
        return {
            secret: this.jwtSecretKey,
            expiresIn: this.jwtAccessTokenExpired,
        };
    }

    get refreshTokenOption(): JwtSignOptions {
        return {
            secret: this.jwtSecretKey,
            expiresIn: this.jwtAccessTokenExpired,
        };
    }
}