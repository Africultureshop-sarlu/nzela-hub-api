import { TimestampEntites } from 'src/generics/timestamp.entites';
import {
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { TypeEstablishmentEntity } from 'src/type_establishment/entities/type_establishment.entity/type_establishment.entity';
import { TownshipEntity } from 'src/township/entities/township.entity/township.entity';
import { RoomEntity } from 'src/room/entities/room.entity/room.entity';

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
  percentage_applicable_tax: number;

  @Column({ nullable: true, type: 'json' })
  pictures: JSON;

  @Column({ nullable: true, type: 'json' })
  settings: JSON;

  @ManyToOne(() => TownshipEntity, (township) => township.establishments, { nullable: false })
  @JoinColumn({ name: 'township_id' })
  township: TownshipEntity;

  @ManyToOne(() => TypeEstablishmentEntity, (type_establishment) => type_establishment.establishments, { nullable: false})
  @JoinColumn({ name: 'type_establishment_id' })
  type_establishment: TypeEstablishmentEntity;

  @OneToMany(() => RoomEntity, (room) => room.establishment, { nullable: false})
  rooms: RoomEntity[];
}
