import { Module } from '@nestjs/common';
import { TypeRoomController } from './type_room.controller';
import { TypeRoomService } from './type_room.service';

@Module({
  controllers: [TypeRoomController],
  providers: [TypeRoomService]
})
export class TypeRoomModule {}
