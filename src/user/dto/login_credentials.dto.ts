import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator";

export class LoginCredentialsDto {

    @ApiProperty({
        minLength: 2,
        required: true,
    })
    @IsNotEmpty()
    @MinLength(2)
    @IsEmail()
    username: string;

    @ApiProperty({
        required: true,
        minLength: 6,
    })
    @IsNotEmpty({
        message: "The password must be required"
    })
    @MinLength(6, {
        message: "The password must be at least 6 characters"
    })
    password: string;
}