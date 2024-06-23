import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class AddCountryDto {
    @ApiProperty({
        required: true,
        description: "The name of the country"
    })
    @IsNotEmpty()
    @IsString()
    name_country: string;

    @ApiProperty({
        required: true,
        description: "The indicatif of the country"
    })
    @IsNotEmpty()
    @IsString()
    area_code: string;

    @ApiProperty({
        required: false,
        description: "More information about the country"
    })
    @IsOptional()
    @IsString()
    description: string;
}