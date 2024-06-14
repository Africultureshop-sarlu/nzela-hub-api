import { TimestampEntites } from "src/generics/timestamp.entites";
import { Column, Entity, Generated, PrimaryGeneratedColumn } from "typeorm";

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

}
