import { PaymentRoomEntity } from 'src/payment_room/entities/payment_room.entity/payment_room.entity';
import { RoomEntity } from 'src/room/entities/room.entity/room.entity';
import { UserEntity } from 'src/user/entities/user.entity/user.entity';
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('booking_rooms')
export class BookingRoomEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  @Column()
  uuid: string;

  @Column({ nullable: false })
  total_price: number;

  @Column({ nullable: false })
  status: string;

  @Column({ nullable: false })
  start_date: Date;

  @Column({ nullable: false })
  end_date: Date;

  @ManyToOne(() => RoomEntity, (room) => room.booking_rooms)
  @JoinColumn({
    name: 'room_id',
  })
  room: RoomEntity;

  @ManyToOne(() => UserEntity, (user) => user.uuid)
  @JoinColumn({
    name: 'user_id',
  })
  user: UserEntity;

  @OneToMany(
    () => PaymentRoomEntity,
    (payment_room) => payment_room.booking_room,
  )
  payment_rooms: PaymentRoomEntity[];
}
