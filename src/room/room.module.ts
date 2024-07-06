import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomEntity } from './entities/room.entity/room.entity';
import { EstablishmentEntity } from 'src/establishment/entities/establishment.entity/establishment.entity';
import { TypeRoomEntity } from 'src/type_room/entities/type_room.entity/type_room.entity';
import { BookingRoomEntity } from 'src/booking_room/entities/booking_room.entity/booking_room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoomEntity, EstablishmentEntity, TypeRoomEntity, BookingRoomEntity])],
  controllers: [RoomController],
  providers: [RoomService]
})
export class RoomModule {}
