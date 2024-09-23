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

export class SignUpReq {
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

    @IsNotEmpty()
    @ApiProperty({
        example: '123456',
    })
    password: string;

    @IsOptional()
    typeUid: string = UserType.PERSONAL;
}