import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtSignOptions } from '@nestjs/jwt/dist/interfaces';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import * as dotenv from 'dotenv';

import * as ms from 'ms';
import { v4 as uuidv4 } from 'uuid';


import { CustomerAuthPayloadInterface, RefreshTokenPayload } from './interfaces/auth-payload.interface';
import { AppConfigService } from 'src/configs/app.config.service';
import { MyCacheService } from 'src/infra-mudules/cache/cache.service';
import { SignUpReq } from './dto/login.dto';
import { User } from 'src/database/entities/user-entity/user.entity';
import { UserRepository } from 'src/database/repositories/user.repository';
import { CacheProvider } from 'src/infra-mudules/cache/cache.provider';
import { ILoggerService } from 'src/common/logger/adapter';

dotenv.config();

@Injectable()
export class AuthService {
    private readonly jwtAccessTokenOption: JwtSignOptions = {};
    private readonly jwtRefreshTokenOption: JwtSignOptions = {};
    private readonly jwtRefreshTokenHashKey: string;
    private readonly jwtRefreshTokenLifeTime: number;
    private isLowSecureForTesting: boolean = true;

    constructor(
        private readonly userRepo: UserRepository,
        private readonly jwtService: JwtService,
        private readonly appConfigService: AppConfigService,
        private readonly cacheProvider: CacheProvider,
        private readonly cacheService: MyCacheService,
        private readonly logger: ILoggerService,
    ) {
        this.jwtAccessTokenOption = this.appConfigService.accessTokenOption;
        this.jwtRefreshTokenOption = this.appConfigService.refreshTokenOption;
        this.jwtRefreshTokenLifeTime = ms(this.jwtRefreshTokenOption.expiresIn);
        this.isLowSecureForTesting =
            (process.env.LOW_SECURE_FOR_TESTING && (process.env.LOW_SECURE_FOR_TESTING).toString() == 'true') ? true : false;
    }
    
}
