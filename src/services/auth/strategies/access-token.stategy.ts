import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as dotenv from 'dotenv';
import { AppConfigService } from 'libs/app-config/src';
import { EntityType, TOKEN_TYPE } from 'libs/common/src';
import { CustomerDetailDto } from 'libs/modules/src';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthService } from '@/modules/auth/auth.service';
import { UserAuthPayloadInterface } from 'src/common/interfaces/auth.interface';

dotenv.config();

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, TOKEN_TYPE.ACCESS_TOKEN) {
    constructor(private readonly authService: AuthService, private configService: AppConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.jwtClientSecretKey,
        });
    }

    async validate(payload: UserAuthPayloadInterface): Promise<CustomerDetailDto> {
        const { userId, entity, jwtId, deviceId }: UserAuthPayloadInterface = payload;
        let user = null;
        if (entity === EntityType.CUSTOMER) {
            user = await this.authService.validateToken(userId, jwtId, deviceId);
        }
        if (user !== null) {
            user.jwtId = jwtId;
            user.deviceId = deviceId;
        }
        return user;
    }
}
