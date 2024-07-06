import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, MinLength } from "class-validator";

export class AddTypeRoomDto {

    @ApiProperty()
    @IsNotEmpty({
        message: "The name of the type room is required"
    })
    @MinLength(2)
    name_type_room: string;

    @ApiProperty()
    @MinLength(2)
    @IsOptional()
    description_type_room: string;
}