import { TimestampEntites } from "src/generics/timestamp.entites";
import { RoleEntity } from "src/role/entities/role.entity/role.entity";
import { Column, Entity, Generated, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @ManyToMany(() => RoleEntity, role => role.uuid)
    @JoinTable({
        name: "user_roles",
        joinColumns : [{ name : "user_id", referencedColumnName: "id" }],
        inverseJoinColumns: [{ name : "role_id", referencedColumnName: "id" }],
    })
    role: RoleEntity[];

}
