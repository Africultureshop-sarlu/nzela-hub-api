import { TimestampEntites } from "src/generics/timestamp.entites";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('roles')
export class RoleEntity extends TimestampEntites{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name_role: string;

    @Column({ nullable: false })
    description_role: string;

}
