import { CountryEntity } from "src/country/entities/country.entity/country.entity";
import { TimestampEntites } from "src/generics/timestamp.entites";
import { TownshipEntity } from "src/township/entities/township.entity/township.entity";
import { Column, Entity, Generated, JoinColumn, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('provincials')
export class ProvincialEntity extends TimestampEntites {

    @PrimaryGeneratedColumn()
    id: number;

    @Generated('uuid')
    @Column()
    uuid: string;

    @Column({ nullable: false })
    provincial_name: string;

    @Column({ nullable: true })
    description: string;

    @OneToMany(() => TownshipEntity, (townships) => townships.provincial, { nullable: false })
    townships: TownshipEntity[];

    @ManyToOne(() => CountryEntity, (country) => country.provincials, { nullable: false })
    @JoinColumn({ name: 'country_id'})
    country: CountryEntity;
}
