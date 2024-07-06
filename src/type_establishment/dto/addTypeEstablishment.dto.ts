import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, MinLength } from "class-validator";

export class AddTypeEstablishmentDto {
    
    @ApiProperty({
        required: true,
        minLength: 1,
        type: "integer"
    })
    @IsNotEmpty()
    @MinLength(1)
    name_type_establishment: number;

    @ApiProperty({
        required: false,
        minLength: 3,
    })
    @IsOptional()
    @MinLength(3)
    description_type_establishment: string;
}