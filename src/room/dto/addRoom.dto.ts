/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class AddRoomDto {
  @ApiProperty({
    required: true,
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  name_room: string;

  @ApiProperty({
    required: false,
    type: 'string',
  })
  @IsOptional()
  @IsString()
  @MinLength(2)
  description_room: string;

  @ApiProperty({
    required: true,
    type: 'integer',
  })
  @IsNotEmpty()
  @IsInt()
  price_per_night: number;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  advantage: JSON;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  pictures: JSON;

  @ApiProperty({
    required: true,
    type: 'string',
  })
  @IsNotEmpty()
  type_room_id: string;
}
