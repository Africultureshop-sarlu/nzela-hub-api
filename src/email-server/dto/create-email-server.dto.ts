/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateEmailServerDto {

    @ApiProperty()
    @IsNotEmpty()
    to: string;

    @ApiProperty()
    @IsNotEmpty()
    subject: string;

    @ApiProperty()
    @IsNotEmpty()
    text: string;

    
}