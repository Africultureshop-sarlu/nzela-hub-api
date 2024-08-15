import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class roomsFilterDto {
  @ApiProperty({
    type: 'string',
    minLength: 2,
  })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiProperty({
    type: 'string',
    minLength: 2,
  })
  @IsOptional()
  @IsString()
  provincial?: string;

  @ApiProperty({
    type: 'array',
  })
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  townships?: string[];

  @ApiProperty({
    type: 'number',
    minLength: 1,
    minimum: 0,
    maximum: 10000,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(10000) // Assuming a maximum price cap
  priceMin?: number;

  @ApiProperty({
    type: 'number',
    minLength: 1,
    minimum: 0,
    maximum: 10000,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(10000) // Assuming a maximum price cap
  priceMax?: number;

  @ApiProperty({
    type: 'date',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dateStart?: Date;

  @ApiProperty({
    type: 'date',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dateEnd?: Date;
}
