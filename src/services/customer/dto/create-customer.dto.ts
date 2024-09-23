import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsUUID } from "class-validator";
import { UserType } from "src/common/enums/index.enum";

export class CreateCustomerBaseDto {
    @IsNotEmpty()
    @ApiProperty({
        example: '0987654321',
    })
    phoneNumber: string;

    @IsNotEmpty()
    @ApiProperty({
        example: '123456',
    })
    password: string;

    @IsOptional()
    sourceId: string = UserType.PERSONAL;
}