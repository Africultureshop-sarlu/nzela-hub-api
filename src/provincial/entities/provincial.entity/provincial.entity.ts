import { CityEntity } from 'src/city/entities/city.entity';
import { CountryEntity } from 'src/country/entities/country.entity/country.entity';
import { TimestampEntites } from 'src/generics/timestamp.entites';
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @OneToMany(() => CityEntity, (cities) => cities.provincial, {
    nullable: false,
  })
  cities: CityEntity[];

  @ManyToOne(() => CountryEntity, (country) => country.provincials, {
    nullable: false,
  })
  @JoinColumn({ name: 'country_id' })
  country: CountryEntity;
}
