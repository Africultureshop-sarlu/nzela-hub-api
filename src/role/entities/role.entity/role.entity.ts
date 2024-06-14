import { TimestampEntites } from "src/generics/timestamp.entites";
import { UserEntity } from "src/user/entities/user.entity/user.entity";
import { Column, Entity, Generated, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('roles')
export class RoleEntity extends TimestampEntites{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Generated('uuid')
    uuid: number;

    @Column({ nullable: false })
    name_role: string;

    @Column({ nullable: false })
    description_role: string;

    @ManyToMany(() => UserEntity, users => users.uuid, {
        cascade: ['insert', 'update'],
        nullable: false,
        eager: true
    })
    @JoinTable({
        name: "user_roles",
    })
    user_role: UserEntity[];
}
