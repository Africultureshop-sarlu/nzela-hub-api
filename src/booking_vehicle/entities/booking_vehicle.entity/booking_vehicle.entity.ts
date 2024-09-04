import { PaymentVehicleEntity } from 'src/payment_vehicle/entities/payment_vehicle.entity/payment_vehicle.entity';
import { UserEntity } from 'src/user/entities/user.entity/user.entity';
import { VehicleEntity } from 'src/vehicle/entities/vehicle.entity/vehicle.entity';
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('booking_vehicles')
export class BookingVehicleEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Generated('uuid')
  uuid: string;

  @Column({ nullable: false })
  total_price: number;

  @Column({ nullable: false })
  status: string;

  @Column({ nullable: false })
  start_date: Date;

  @Column({ nullable: false })
  end_date: Date;

  @Column({ nullable: false })
  from_started: string;

  @ManyToOne(() => UserEntity, (user) => user.uuid)
  @JoinColumn({
    name: 'user_id',
  })
  user: UserEntity;

  @ManyToOne(() => VehicleEntity, (vehicle) => vehicle.uuid)
  @JoinColumn({
    name: 'vehicle_id',
  })
  vehicle: VehicleEntity;

  @OneToMany(
    () => PaymentVehicleEntity,
    (payment_vehicle) => payment_vehicle.uuid,
  )
  payment_vehicles: PaymentVehicleEntity[];
}
