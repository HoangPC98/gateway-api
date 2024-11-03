import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class ICheckPhoneOrEmailReq {
  @IsNotEmpty()
  @ApiProperty({})
  usr: string;

  @IsOptional()
  deviceId?: string;

  @IsOptional()
  forSignUp?: boolean;
}
