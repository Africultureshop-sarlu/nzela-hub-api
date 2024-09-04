import { Module } from '@nestjs/common';
import { BookingRoomController } from './booking_room.controller';
import { BookingRoomService } from './booking_room.service';
import { UserEntity } from 'src/user/entities/user.entity/user.entity';
import { RoleEntity } from 'src/role/entities/role.entity/role.entity';
import { UserRoleEntity } from 'src/user_role/entities/user_role.entity/user_role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomEntity } from 'src/room/entities/room.entity/room.entity';
import { BookingRoomEntity } from './entities/booking_room.entity/booking_room.entity';
import { PaymentRoomEntity } from 'src/payment_room/entities/payment_room.entity/payment_room.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      RoleEntity,
      UserRoleEntity,
      RoomEntity,
      BookingRoomEntity,
      PaymentRoomEntity,
    ]),
  ],
  controllers: [BookingRoomController],
  providers: [BookingRoomService],
})
export class BookingRoomModule {}
