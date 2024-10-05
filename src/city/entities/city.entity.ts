import { TimestampEntites } from 'src/generics/timestamp.entites';
import { ProvincialEntity } from 'src/provincial/entities/provincial.entity/provincial.entity';
import { TownshipEntity } from 'src/township/entities/township.entity/township.entity';
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('cities')
export class CityEntity extends TimestampEntites {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  @Column()
  uuid: string;

  @Column({ nullable: false })
  city_name: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => TownshipEntity, (townships) => townships.city, {
    nullable: false,
  })
  townships: TownshipEntity[];

  @ManyToOne(() => ProvincialEntity, (provincial) => provincial.cities, {
    nullable: false,
  })
  @JoinColumn({ name: 'provincial_id' })
  provincial: ProvincialEntity;
}
