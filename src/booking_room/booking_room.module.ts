import { Module } from '@nestjs/common';
import { BookingRoomController } from './booking_room.controller';
import { BookingRoomService } from './booking_room.service';

@Module({
  controllers: [BookingRoomController],
  providers: [BookingRoomService]
})
export class BookingRoomModule {}
