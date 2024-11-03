import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { EUserType } from 'src/common/enums/user.enum';

export class LoginByUsrPwdReq {
  @IsNotEmpty()
  @ApiProperty({ default: '0123456789' })
  usr: string;

  @IsNotEmpty()
  @ApiProperty({ default: '123456' })
  password: string;
}

export class SignUpReq {
  @IsNotEmpty()
  @ApiProperty({
    example: '123456',
  })
  password: string;

  @IsNotEmpty()
  @ApiProperty({
    example: '123456',
  })
  phoneOrEmail: string;
}

export class SignUpByUsrReq extends SignUpReq {
  @IsOptional()
  @ApiProperty({
    example: '0987654321',
  })
  phoneNumber: string;

  @IsOptional()
  @ApiProperty({
    example: 'abc123@gmail.com',
  })
  email: string;
}
