import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, MinLength } from 'class-validator';

export class AddBookingRoomDto {
  @ApiProperty({
    required: true,
    minLength: 10,
    type: 'string',
  })
  @IsNotEmpty()
  @MinLength(10)
  room_id: string;

  @ApiProperty({
    required: true,
    minLength: 3,
    type: 'string',
  })
  @IsNotEmpty()
  @MinLength(3)
  payment_method: string;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  start_date: string;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  end_date: string;
}
