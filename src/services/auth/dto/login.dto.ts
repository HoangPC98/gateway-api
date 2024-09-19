import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";


export class LoginByUsrPwsdDto {
    @IsNotEmpty()
    @ApiProperty({ default: '0123456789' })
    user: string;

    @IsNotEmpty()
    @ApiProperty({ default: '123456' })
    password: string;
}