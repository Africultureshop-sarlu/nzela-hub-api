import { Module } from '@nestjs/common';
import { PaymentRoomController } from './payment_room.controller';
import { PaymentRoomService } from './payment_room.service';

@Module({
  controllers: [PaymentRoomController],
  providers: [PaymentRoomService]
})
export class PaymentRoomModule {}
