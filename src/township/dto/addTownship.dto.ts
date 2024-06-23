import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, MinLength } from "class-validator";

export class addTownshipDto {

    @ApiProperty({
        required: true,
    })
    @MinLength(2)
    township_name: string;

    @ApiProperty({
        required: false,

    })
    @IsOptional()
    @MinLength(2)
    description_township: string;

    @ApiProperty({
        required: true,
    })
    @IsNotEmpty()
    @MinLength(2)
    provincial_id: string;

}