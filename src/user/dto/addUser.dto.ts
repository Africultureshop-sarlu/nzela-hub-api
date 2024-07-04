import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class AddUserDto {

    @ApiProperty({
        required: true,
    })
    @IsNotEmpty({
        message: "The username is required"
    })
    username: string;

    @ApiProperty({})
    @IsNotEmpty({
        message: "The first name is required"
    })
    firstname: string;

    @ApiProperty({})
    @IsNotEmpty({
        message: "The middlename is required"
    })
    middlename: string;

    @ApiProperty({})
    @IsNotEmpty({
        message: "The lastname is required"
    })
    lastname: string;

    @ApiProperty({
        required: true,
    })
    @IsNotEmpty({
        message: "The birthdate is required"
    })
    birthdate: string;

    @IsNotEmpty({
        message: "This property is required"
    })
    @ApiProperty({
        required: true,
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        required: true,
        minLength: 8,
    })
    @IsNotEmpty({
        message: "The password is required"
    })
    password: string;

    @ApiProperty({
        required: false,
    })
    @IsOptional()
    paiment_informations: JSON;

    @ApiProperty({
        required: true, 
        type: "string",
    })
    @IsNotEmpty({
        message: "The role id is required"
    })
    role_id: string;
}