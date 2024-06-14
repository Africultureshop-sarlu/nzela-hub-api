import { TimestampEntites } from "src/generics/timestamp.entites";
import { Column, Entity, Generated, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EstablishmentEntity } from "../../../establishment/entities/establishment.entity/establishment.entity";

@Entity('countries')
export class CountryEntity extends TimestampEntites {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Generated('uuid')
    uuid: string;

    @Column({ nullable: false })
    name_country: string;

    @Column({ nullable: false })
    area_code: string;

    @Column({ nullable: true })
    description: string;

    @OneToMany(() => EstablishmentEntity, (establishment) => establishment.country)
    establishments: EstablishmentEntity[]

}
