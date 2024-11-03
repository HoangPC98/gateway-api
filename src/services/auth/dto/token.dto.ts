import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GetRefreshTokenRequest {
  @IsNotEmpty()
  @ApiProperty()
  refreshToken: string;
}

export class GetRefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export type UserAuthJwtDto = {
  uid: string;
  state: string;
  email: string;
  phone: string;
};
