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
import { SignUpReq } from './dto/login.dto';
import { User } from 'src/database/entities/user-entity/user.entity';

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
    async signUp(signUpDto: SignUpReq){
        let newUser: User;
        const checkCustomer = await this.customerRepository.findAnyByPhoneNumber(signUpDto.phoneNumber, 'withDeleted');
        if (checkCustomer) {
            if (checkCustomer.isDeleted())
                checkCustomer.deletedAt = null;
            else
                // throw CustomerException.phoneExisted();
        }
            let { phoneNumber, otpCode, trackingId } = signUpDto as signUpDto;
            const checkOtp = await this.otpProvider.validate(phoneNumber, otpCode, trackingId);
            if (!checkOtp) {
                throw OtpException.otpInvalid();
            }
            newCust = plainToInstance(Customer, signUpDto);
        }
        else if (inCtxEnterpriseInit || signUpDto instanceof CreateCustomerEnterpriseDto) {
            newCust = plainToInstance(CreateCustomerEnterpriseDto, {
                ...signUpDto,
                gender: 0,
                password: null,
                active: 1,
            })

        }

        let customer: Customer = checkCustomer ? checkCustomer : (await this.customerRepository.save(newCust));
        customer.type = signUpDto.type || CustomerType.PERSONAL;
        customer.isNotification = DB_BOOLEAN_VALUE.FALSE;
        let custBalance: Balance = this.balanceRepo.create({
            customerId: customer.id,
            type: BalanceType.NORMAL,
            freezedMoney: 0,
            availableMoney: 0,
        });
        customer.balances = [custBalance];

        this.loggerService.info({
            message: `Create customer, Customer: ${customer.phoneNumber}`,
            obj: {
                customer,
                deviceId,
            },
            context: 'CustomerService.create',
        });
        if (request)
            customer.device = await this.customerDeviceService.upsertDevice(customer, deviceId, request);

        await Promise.all([
            this.securitySettingService.setDefaultSetting(customer),
            this.appMetricService.saveAppMetricsAccount(
                AppMetricType.ACCOUNT_METRIC,
                AppMetricsEnum.TOTAL_ACCOUNT_REGISTER,
            ),
            this.appMetricService.saveAppMetricsAccount(
                AppMetricType.ACCOUNT_METRIC,
                AppMetricsEnum.TOTAL_PERSONAL_ACCOUNT,
            ),
            this.balanceRepo.save(custBalance)
        ]);

        return inCtxEnterpriseInit
            ? { customerIdForEnterpriseInit: customer.id }
            : this.getResponse(customer, deviceId);
    }
}
