import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class AddCustomerDto {
  @ApiProperty({
    required: false,
  })
  @IsOptional({
    message: 'The username is required',
  })
  username: string;

  @ApiProperty({})
  @IsNotEmpty({
    message: 'The first name is required',
  })
  firstname: string;

  @ApiProperty({})
  @IsNotEmpty({
    message: 'The middlename is required',
  })
  middlename: string;

  @ApiProperty({})
  @IsNotEmpty({
    message: 'The lastname is required',
  })
  lastname: string;

  @ApiProperty({
    required: false,
  })
  @IsDate()
  @IsOptional({
    message: 'The birthdate is required',
  })
  birthdate: string;

  @IsNotEmpty({
    message: 'This property is required',
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
    message: 'The password is required',
  })
  password: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  paiement_informations: JSON;
}
