import { TimestampEntites } from "src/generics/timestamp.entites";
import { UserEntity } from "src/user/entities/user.entity/user.entity";
import { UserRoleEntity } from "src/user_role/entities/user_role.entity/user_role.entity";
import { Column, Entity, Generated, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('roles')
export class RoleEntity extends TimestampEntites{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Generated('uuid')
    uuid: string;

    @Column({ nullable: false })
    name_role: string;

    @Column({ nullable: false })
    description_role: string;

    @OneToMany(() => UserRoleEntity, (user_role) => user_role.role)
    user_roles: UserRoleEntity[];
}
