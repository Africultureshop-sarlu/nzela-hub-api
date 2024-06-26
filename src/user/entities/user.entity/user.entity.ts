import { IsEmail, MinLength } from "class-validator";
import { CommentEntity } from "src/comment/entities/comment.entity/comment.entity";
import { TimestampEntites } from "src/generics/timestamp.entites";
import { RoleEntity } from "src/role/entities/role.entity/role.entity";
import { UserRoleEntity } from "src/user_role/entities/user_role.entity/user_role.entity";
import { Column, Entity, Generated, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('users')
export class UserEntity extends TimestampEntites {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Generated('uuid')
    uuid: string;

    @Column({ nullable: false })
    username: string;

    @Column({ nullable: false })
    firstname: string;

    @Column({ nullable: false })
    middlename: string;

    @Column({ nullable: false })
    lastname: string;

    @Column({ nullable: false})
    birthdate: string;

    @Column({ nullable: false})
    wallet: number;

    @IsEmail()
    @Column({ nullable: false, unique: true})
    email: string;

    @Column({ nullable: false, unique: true })
    @MinLength(8)
    password: string;

    @Column({ nullable: true,  type:"json" })
    paiment_informations: JSON;

    @OneToMany(() => UserRoleEntity, role => role.user)
    user_roles: UserRoleEntity[];

    @OneToMany(() => CommentEntity, (comments) => comments.uuid)
    comments: CommentEntity[];
}
