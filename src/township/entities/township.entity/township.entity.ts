import { CityEntity } from 'src/city/entities/city.entity';
import { EstablishmentEntity } from 'src/establishment/entities/establishment.entity/establishment.entity';
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

@Entity('townships')
export class TownshipEntity extends TimestampEntites {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  @Column()
  uuid: string;

  @Column({ nullable: false })
  township_name: string;

  @Column({ nullable: true })
  description_township: string;

  @ManyToOne(() => CityEntity, (city) => city.townships, {
    nullable: false,
  })
  @JoinColumn({ name: 'city_id', referencedColumnName: 'id' })
  city: CityEntity;

  @OneToMany(
    () => EstablishmentEntity,
    (establishment) => establishment.township,
    { nullable: false },
  )
  establishments: EstablishmentEntity[];
}
