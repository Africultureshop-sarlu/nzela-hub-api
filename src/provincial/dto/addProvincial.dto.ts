import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, MinLength } from "class-validator";

export class AddProvinceDto {
    
    @ApiProperty({
        required: true,
        minLength:2,
        description: "The name of the province",
    })
    @IsNotEmpty({
    })
    provincial_name: string;
    
    @ApiProperty({
        required: false,
        minLength:2,
    })
    @IsOptional()
    @MinLength(2)
    description: string;

    @ApiProperty({
        required: true,
        minLength:2,
        description: "The id of country",
    })
    @IsNotEmpty({
    })
    country_id: string;
}