import { ApiProperty } from "@nestjs/swagger";
import { isBoolean, isNotEmpty, IsNotEmpty } from "class-validator";

export class roomsFilterDto {

    @ApiProperty({
        required: true,
        type: "boolean",
    })
    @IsNotEmpty()
    @isBoolean('false')
    price: boolean;

    @ApiProperty({
        required: true,
        type: "boolean",
    })
    @isNotEmpty()
    provincial: boolean;
}