import { CommentEntity } from "src/comment/entities/comment.entity/comment.entity";
import { TimestampEntites } from "src/generics/timestamp.entites";
import { RoleEntity } from "src/role/entities/role.entity/role.entity";
import { UserRoleEntity } from "src/user_role/entities/user_role.entity/user_role.entity";
import { Column, Entity, Generated, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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
    password: string;

    @Column({ nullable: false})
    birthdate: string;

    @Column({ nullable: false})
    wallet: number;

    @Column({ nullable: true,  type:"json" })
    paiment_informations: JSON;

    @OneToMany(() => UserRoleEntity, role => role.user)
    // @JoinTable({
    //     name: "user_roles",
    //     joinColumns : [{ name : "user_id", referencedColumnName: "id" }],
    //     inverseJoinColumns: [{ name : "role_id", referencedColumnName: "id" }],
    // })
    user_roles: UserRoleEntity[];

    @OneToMany(() => CommentEntity, (comments) => comments.uuid)
    comments: CommentEntity[];
}
