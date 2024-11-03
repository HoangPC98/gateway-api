import { Body, Controller, Get, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiHeader, ApiHeaders, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

// import { RefreshTokenBodyPayload, RefreshTokenResponse } from '@/modules/auth/dto/auth.dto';
import { AuthService } from './auth.service';
import { LoginByUsrPwdReq, SignUpByUsrReq, SignUpReq } from './dto/login.dto';
import { Public, UserLogged } from 'src/common/decorators/auth.decorator';
import { UserAuthJwtDto } from './dto/token.dto';
import { ICheckPhoneOrEmailReq } from './dto/validate.auth.dto';

@Controller({
  path: 'auth',
  version: '1',
})
@ApiBearerAuth('access-token')
@ApiHeader({
  name: 'DeviceId',
  required: true,
  schema: {
    type: 'string',
    default: '123CZASCZX',
  },
})
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiHeaders([
    {
      name: 'DeviceAgent',
      required: true,
      schema: {
        type: 'string',
        default: 'Chrome DEMO',
      },
    },
    {
      name: 'PlatformName',
      required: true,
      schema: {
        type: 'string',
        default: 'Linux OS',
      },
    },
    {
      name: 'PlatformVersion',
      required: true,
      example: 'Linux OS v12',
      schema: {
        type: 'string',
        default: 'Linux OS v12',
      },
    },
  ])
  @Post('sign-up/by-usr')
  @Public()
  async signUp(@Body() signUpDto: SignUpReq, @Req() request: Request): Promise<any> {
    return await this.authService.signUpByUsr(signUpDto);
  }

  @Post('login/by-usr')
  @Public()
  @ApiBody({
    description: 'Username and password',
    type: LoginByUsrPwdReq,
  })
  async login(@Body() { usr, password }: LoginByUsrPwdReq): Promise<any> {
    return this.authService.loginByUsr(usr, password);
  }

  @Post('logout')
  async logout(@UserLogged() user: UserAuthJwtDto): Promise<void> {
    return this.authService.logout(user);
  }

  @Post('check-phone-or-email')
  @Public()
  async checkPhoneOrEmail(@Body() body: ICheckPhoneOrEmailReq): Promise<any> {
    return await this.authService.checkPhoneOrEmail(body.usr, body.forSignUp);
  }

  // @Post('refresh-token')
  // @Public()
  // @UseGuards(AuthGuard(TOKEN_TYPE.REFRESH_TOKEN))
  // compareRefreshToken(
  //     @Body() payload: RefreshTokenBodyPayload,
  //     @CurrentUser() customer: CustomerDetailDto,
  //     @CurrentDeviceId() deviceId: string,
  // ): Promise<RefreshTokenResponse> {
  //     return this.authService.refreshToken(customer, deviceId);
  // }

  // @Post('login-new-device')
  // @Public()
  // @ApiBody({
  //     description: 'Username and password',
  //     type: CustomerLoginNewDeviceDto,
  // })
  // loginOnNewDevice(
  //     @Body() payload: CustomerLoginNewDeviceDto,
  //     @CurrentDeviceId() deviceId: string,
  //     @RequestContext() request: Request,
  // ): Promise<CustomerLoginResponse> {
  //     return this.customerService.loginOnNewDevice(payload, deviceId, request);
  // }

  // @Post('change-password')
  // changePassword(
  //     @CurrentUser() customer: Customer,
  //     @Body() dto: CustomerChangePasswordDto,
  //     @CurrentDeviceId() deviceId: string,
  //     @RequestContext() request: Request,
  // ): Promise<CustomerLoginResponse> {
  //     return this.customerService.changePassword(customer, dto, deviceId, request);
  // }

  // @Post('forgot-password')
  // @Public()
  // forgotPasswordNoVerify(@Body() dto: ForgotPasswordDto): Promise<void> {
  //     return this.customerService.forgotPassword(dto);
  // }

  // @Post('set-biometric')
  // setBiometricKey(
  //     @Body() dto: SetBiometricPublicKeyDto,
  //     @CurrentUser() customer: Customer,
  //     @CurrentDeviceId() deviceId: string,
  // ): Promise<boolean> {
  //     return this.customerService.setBiometricKey(dto, customer, deviceId);
  // }

  // @Post('login-biometric')
  // @Public()
  // loginBiometric(
  //     @Body() dto: LoginBiometricDto,
  //     @CurrentDeviceId() deviceId: string,
  // ): Promise<CustomerLoginResponse> {
  //     return this.customerService.loginBiometric(dto, deviceId);
  // }

  // @Put('remove-biometric')
  // removeBiometric(@CurrentUser() customer: Customer, @CurrentDeviceId() deviceId: string): Promise<boolean> {
  //     return this.customerService.removeBiometric(customer, deviceId);
  // }

  // @Public()
  // @Post('validate-password')
  // validatePassword(@Body() dto: ClientValidatePasswordDto): Promise<boolean> {
  //     return this.customerService.validatePassword(dto);
  // }

  // @Public()
  // @Post('validate-new-password')
  // validateNewPassword(@Body() dto: ValidateNewPasswordDto): Promise<boolean> {
  //     return this.customerService.validateNewPassword(dto);
  // }

  // @Post('verify-identity')
  // @Public()
  // verifyIdentity(@Body() dto: VerifyIndentityDto): Promise<string> {
  //     return this.customerService.verifyIdentity(dto);
  // }

  // @Post('verify-bank-link')
  // @Public()
  // verifyBankLink(@Body() dto: VerifyPaymentLInkDto): Promise<string> {
  //     return this.customerService.verifyBankLink(dto);
  // }
}
