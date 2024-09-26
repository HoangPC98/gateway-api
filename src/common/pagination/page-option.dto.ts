import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { OrderBy } from '../enums/index.enum';

export class PageOptionsDto {
    @ApiPropertyOptional({
        enum: OrderBy,
        default: OrderBy.DESC,
    })
    @IsEnum(OrderBy)
    readonly order?: OrderBy = OrderBy.DESC;

    @IsOptional()
    readonly orderBy?: string = 'createdAt';

    @ApiPropertyOptional({
        minimum: 1,
        default: 1,
    })
    @Type(() => Number)
    @IsInt()
    @Min(1)
    readonly page?: number = 1;

    @ApiPropertyOptional({
        minimum: 1,
        maximum: 1000,
        default: 10,
    })
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(1000)
    readonly take?: number = 10;

    @ApiPropertyOptional()
    @Type(() => String)
    readonly query?: string;
}
