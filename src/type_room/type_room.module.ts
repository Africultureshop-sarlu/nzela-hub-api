import { Module } from '@nestjs/common';
import { TypeRoomController } from './type_room.controller';
import { TypeRoomService } from './type_room.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeRoomEntity } from './entities/type_room.entity/type_room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TypeRoomEntity])],
  controllers: [TypeRoomController],
  providers: [TypeRoomService]
})
export class TypeRoomModule {}
