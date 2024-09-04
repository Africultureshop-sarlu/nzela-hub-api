import { BookingRoomEntity } from 'src/booking_room/entities/booking_room.entity/booking_room.entity';
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('payment_rooms')
export class PaymentRoomEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uuid: string;

  @Column({ nullable: false })
  amount: string;

  @Column({ nullable: false })
  payment_method: string;

  @Column({ nullable: false })
  status: string;

  @Column({ nullable: false, default: false })
  using_wallet: boolean;

  @ManyToOne(
    () => BookingRoomEntity,
    (booking_room) => booking_room.payment_rooms,
  )
  @JoinColumn({
    name: 'booking_room_id',
  })
  booking_room: BookingRoomEntity;
}
