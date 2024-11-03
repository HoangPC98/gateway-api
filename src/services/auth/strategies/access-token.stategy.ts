import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as dotenv from 'dotenv';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthService } from '../auth.service';
import { AppConfigService } from 'src/configs/app.config.service';
import { IUserAuthPayload } from 'src/common/interfaces/auth.interface';
import { User } from 'src/entities/user-entity/user.entity';
import { TOKEN_TYPE } from 'src/common/enums/index.enum';

dotenv.config();

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, TOKEN_TYPE.ACCESS_TOKEN) {
  constructor(
    private readonly authService: AuthService,
    private configService: AppConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.jwtAccessTokenSecret,
    });
  }

  async validate(payload: IUserAuthPayload): Promise<User> {
    const { userId, entity, jwtId }: IUserAuthPayload = payload;
    let user = null;
    if (user !== null) {
      user.jwtId = jwtId;
    }
    return user;
  }
}
