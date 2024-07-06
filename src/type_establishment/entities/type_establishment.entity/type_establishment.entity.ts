import { EstablishmentEntity } from "src/establishment/entities/establishment.entity/establishment.entity";
import { TimestampEntites } from "src/generics/timestamp.entites";
import { Column, Entity, Generated, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('type_etablishement')
export class TypeEstablishmentEntity extends TimestampEntites {

    @PrimaryGeneratedColumn({ type: "integer"})
    id: number;

    @Column({ nullable: false })
    @Generated("uuid")
    uuid: string;

    @Column({ nullable: false})
    name_type_establishment: number;

    @Column({ nullable: true, type: "text" })
    description_type_establishment: string;

    @OneToMany(() => EstablishmentEntity, (establishment) => establishment.type_establishment, {nullable: false})
    establishments: EstablishmentEntity[];
}
