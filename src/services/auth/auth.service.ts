import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtSignOptions } from '@nestjs/jwt/dist/interfaces';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import * as dotenv from 'dotenv';
import * as ms from 'ms';
import { v4 as uuidv4 } from 'uuid';


import { AppConfigService } from 'src/configs/app.config.service';
import { MyCacheService } from 'src/infra-mudules/cache/cache.service';
import { SignUpReq } from './dto/login.dto';
import { User } from 'src/database/entities/user-entity/user.entity';
import { OtpService } from './otp.service';
import { OtpException } from 'src/common/exeptions/otp.exception';
import { UserException } from 'src/common/exeptions/user.exeption';
import { UserType } from 'src/common/enums/index.enum';
import { LoggerService } from 'src/common/logger/service';
import { UserRepository } from 'src/repositories/user.repository';
import { UserSettingRepository } from 'src/repositories/user-setting.repository';

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
        private readonly userSettingRepo: UserSettingRepository,

        private readonly jwtService: JwtService,
        private readonly appConfigService: AppConfigService,
        private readonly cacheService: MyCacheService,
        private readonly logService: LoggerService,
        private readonly otpService: OtpService
    ) {
        this.jwtAccessTokenOption = this.appConfigService.accessTokenOption;
        this.jwtRefreshTokenOption = this.appConfigService.refreshTokenOption;
        this.jwtRefreshTokenLifeTime = ms(this.jwtRefreshTokenOption.expiresIn);
        this.isLowSecureForTesting =
            (process.env.LOW_SECURE_FOR_TESTING && (process.env.LOW_SECURE_FOR_TESTING).toString() == 'true') ? true : false;
    }
    async signUp(signUpDto: SignUpReq) {
        let newUser: User;
        const checkUser = await this.userRepo.getActiveByPhoneNumber(signUpDto.phoneNumber);
        if (checkUser) {
            if (checkUser.isDeleted())
                checkUser.deletedAt = null;
            else
                throw UserException.phoneExisted();
        }
        let { phoneNumber, otp, sessionId } = signUpDto;
        const checkOtp = await this.otpService.validate(phoneNumber, otp, sessionId);
        if (!checkOtp) {
            throw OtpException.otpInvalid();
        }
        newUser = plainToInstance(User, signUpDto);


        const user: User = checkUser ? checkUser : (await this.userRepo.save(newUser));
        user.type = UserType.PERSONAL;

        this.logService.info({
            message: `Created User: ${user.phoneNumber}`,
            obj: { user }
        });


        await this.userSettingRepo.setDefaultSetting(user.id),
    }

    async refreshToken(user: User, currentDeviceId: string): Promise<RefreshTokenResponse> {
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
}
