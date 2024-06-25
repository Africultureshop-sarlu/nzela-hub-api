import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, MinLength } from "class-validator";

export class AddEstablishmentDto {
    @ApiProperty({
        required: true,
        minLength: 2,
    })
    @IsNotEmpty()
    @MinLength(2)
    name_establishment: string;

    @ApiProperty({
        required: true,
        minLength: 2,
    })
    @IsNotEmpty()
    @MinLength(2)
    address: string;
  
    @ApiProperty({
        required: true,
        minLength: 2,
    })
    @IsNotEmpty()
    @MinLength(2)
    city: string;
  
    @ApiProperty({
        required: false,
        minLength: 2,
    })
    @IsOptional()
    @MinLength(2)
    latitude: number;
  
    @ApiProperty({
        required: false,
        minLength: 2,
    })
    @IsOptional()
    @MinLength(2)
    longitude: number;
  
    @ApiProperty({
        required: true,
        minLength: 2,
    })
    @IsNotEmpty()
    @MinLength(2)
    zipcode: string;
  
    @ApiProperty({
        required: true,
        minLength: 10
    })
    @IsNotEmpty()
    @MinLength(10)
    phone: string;
  
    @ApiProperty({
        required: true,
        uniqueItems: true,
    })
    @IsNotEmpty()
    @MinLength(6)
    email: string;
  
    @ApiProperty({
        nullable: false,
    })
    @IsNotEmpty()
    applicable_tax: string;
  
    @ApiProperty({
        nullable: false,
    })
    @IsNotEmpty()
    percentage_applicable_tax: number;
  
    @ApiProperty({
        nullable: true,
        required: false,
    })
    @IsOptional()
    pictures: JSON;
  
    @ApiProperty({
        nullable: true,
        required: false,
    })
    @IsOptional()
    settings: JSON;
  
    @ApiProperty({
        nullable: false,
        required: false,
    })
    @IsNotEmpty()
    township_id: string;
  
    @ApiProperty({
        nullable: false,
        required: false,
    })
    @IsNotEmpty()
    type_establishment_id: string;
}