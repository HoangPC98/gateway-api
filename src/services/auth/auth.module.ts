import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { OtpProvider } from 'src/providers/otp/otp.provider';
import { AccessTokenStrategy } from './strategies/access-token.stategy';
import { UsersRepository } from 'src/database/repositories/user.repository';
import { AppConfigService } from 'src/configs/app.config.service';
import { CacheProvider } from 'src/providers/cache/cache.provider';
import { AuthBaseService } from './auth.base.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user-entity/user.entity';
import { MyCacheModule } from 'src/providers/cache/cache.module';
import { UserProfile } from 'src/entities/user-entity/user_profile.entity';
import { DatabaseModule } from 'src/database/database.module';

dotenv.config();

@Module({
  imports: [
    JwtModule.register({
      secret: `${process.env.JWT_CLIENT_SECRET_KEY}`,
      signOptions: {
        expiresIn: `${process.env.JWT_CLIENT_TOKEN_EXPIRED}`,
      },
    }),
    MyCacheModule,
    DatabaseModule
  ],
  providers: [AuthService, AuthBaseService, AccessTokenStrategy, UsersRepository, AppConfigService],
  controllers: [AuthController],
  exports: [AuthService, AccessTokenStrategy],
})
export class AuthModule {}
