import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtSignOptions } from '@nestjs/jwt/dist/interfaces';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import * as dotenv from 'dotenv';

import * as ms from 'ms';
import { v4 as uuidv4 } from 'uuid';

import { LoginByUsrPwdReq, SignUpByUsrReq, SignUpReq } from './dto/login.dto';
import { User } from 'src/entities/user-entity/user.entity';
import { UserRepository } from 'src/database/repositories/user.repository';
import { CacheProvider } from 'src/providers/cache/cache.provider';
import { ILoggerService } from 'src/common/logger/adapter';
import { UserAuthJwtDto } from './dto/token.dto';
import { AuthBaseService } from './auth.base.service';
import { IGetTokenResp } from 'src/common/interfaces/auth.interface';
import { ErrorMessage } from 'src/common/enums/error.enum';

dotenv.config();

@Injectable()
export class AuthService extends AuthBaseService {
  async loginByUsr(usr: string, password: string): Promise<IGetTokenResp> {
    const user = await this.userRepo.findOneBy({ usr });
    await this.handleLoginCredit(user, password);
    return await this.getClientTokens(user);
  }

  async signUpByUsr(dto: SignUpReq) {
    const user = await this.userRepo.findOneBy({ usr: dto.phoneOrEmail });
    await this.checkPhoneOrEmail(dto.phoneOrEmail, 1);
    const newUser = this.userRepo.create({
      usr: dto.phoneOrEmail,
      password: dto.password,
    });
    return await this.getClientTokens(user);
  }

  async logout(user: UserAuthJwtDto) {}

  async checkPhoneOrEmail(usr: string, forSignUp: any): Promise<any> {
    const userByUsr = await this.userRepo.findOneBy({ usr });
    if (userByUsr) {
      if (forSignUp) throw new BadRequestException(ErrorMessage.USR_IS_EXISTED);
    }
    return {
      isSignUp: false,
      isLock: false,
      loginNewDevice: false,
    };
  }
}
