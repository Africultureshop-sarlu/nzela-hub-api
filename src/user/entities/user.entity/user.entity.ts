/* eslint-disable prettier/prettier */
import { IsEmail, MinLength } from 'class-validator';
import { CommentEntity } from 'src/comment/entities/comment.entity/comment.entity';
import { TimestampEntites } from 'src/generics/timestamp.entites';
import { UserRoleEntity } from 'src/user_role/entities/user_role.entity/user_role.entity';
import {
  Column,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity extends TimestampEntites {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uuid: string;

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: false })
  firstname: string;

  @Column({ nullable: true })
  middlename: string;

  @Column({ nullable: false })
  lastname: string;

  @Column({ nullable: true })
  birthdate: string;

  @Column({ nullable: false })
  wallet: number;

  @IsEmail()
  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false, unique: true })
  @MinLength(8)
  password: string;

  @Column({ nullable: false })
  salt: string;

  @Column({ nullable: true, type: 'json' })
  paiment_informations: JSON;

  @OneToMany(() => UserRoleEntity, (role) => role.user)
  user_roles: UserRoleEntity[];

  @OneToMany(() => CommentEntity, (comments) => comments.uuid)
  comments: CommentEntity[];
}
