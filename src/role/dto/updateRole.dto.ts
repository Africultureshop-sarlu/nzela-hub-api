import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateRoleDto {

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
