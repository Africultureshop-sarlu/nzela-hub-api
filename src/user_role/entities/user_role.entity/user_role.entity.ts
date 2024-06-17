import { TimestampEntites } from "src/generics/timestamp.entites";
import { RoleEntity } from "src/role/entities/role.entity/role.entity";
import { UserEntity } from "src/user/entities/user.entity/user.entity";
import { Column, Entity, Generated, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('user_roles')
export class UserRoleEntity extends TimestampEntites {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Generated("uuid")
    uuid: string;

    @ManyToOne(() => UserEntity, (user) => user.user_roles)
    @JoinColumn({
        name: "user_id",
    })
    user: UserEntity;

    @ManyToOne(() => RoleEntity, (role) => role.uuid)
    @JoinColumn({
        name: "role_id",
    })
    role: RoleEntity;
}
