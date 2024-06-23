import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateRoleDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'Le nom du role ne doit pas etre vide',
  })
  @IsString({
    message: 'Veuillez saisir les caractères',
  })
  @MinLength(2, {
    message: 'La taille minimale est de deux caractères pour le nom du role',
  })
  name_role: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Le nom du role ne doit pas etre vide',
  })
  @IsString({
    message: 'Veuillez saisir les caractères',
  })
  @MinLength(2, {
    message: 'La taille minimale est de deux caractères pour la description du role',
  })
  description_role: string;
}
