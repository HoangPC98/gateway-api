import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";
import { UserType } from "src/common/enums/index.enum";


export class LoginByUsrPwsdReq {
    @IsNotEmpty()
    @ApiProperty({ default: '0123456789' })
    uid: string;

    @IsNotEmpty()
    @ApiProperty({ default: '123456' })
    password: string;
}

export class LoginResp {
   accessToken: string;
   refreshToken: string;
}


export class SignUpReq {
    @IsOptional()
    @ApiProperty()
    phoneNumber: string;

    @IsOptional()
    @ApiProperty()
    email: string;

    @IsNotEmpty()
    @ApiProperty()
    password: string;

    @IsNotEmpty()
    @ApiProperty()
    otp: string;

    @IsNotEmpty()
    @ApiProperty()
    sessionId: string;

    @IsOptional()
    typeUid: string = UserType.PERSONAL;
}