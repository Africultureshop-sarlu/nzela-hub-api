import { TimestampEntites } from "src/generics/timestamp.entites";
import { Entity, Generated, OneToMany, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { CountryEntity } from "../../../country/entities/country.entity/country.entity";

@Entity('establishments')
export class EstablishmentEntity extends TimestampEntites {
    @PrimaryGeneratedColumn()
    id: number; 

    @Column()
    @Generated('uuid')
    uuid: string;
    
    @Column({ nullable: false })
    name_establishment: string;

    @Column({ nullable: false })
    address: string;

    @Column({ nullable: false })
    city: string;

    @Column({ nullable: true })
    latitude: number;

    @Column({ nullable: true })
    longitude: number;

    @Column({ nullable: true })
    zipcode: string;

    @Column({ nullable: false })
    phone: string;

    @Column({ nullable: false, unique: true })
    email: string;

    @Column({ nullable: false })
    applicable_tax: string;

    @Column({ nullable: false })
    percentage_applicable_tax:  number;

    @Column({ nullable: true, type: 'json' })
    pictures: JSON;

    @Column({ nullable: true, type: 'json'})
    settings: JSON;

    @ManyToOne(() => CountryEntity, (country) => country.uuid)
    @JoinColumn({ name: 'country_id'})
    country: CountryEntity;
}
