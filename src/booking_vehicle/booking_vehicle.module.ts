import { Module } from '@nestjs/common';
import { BookingVehicleController } from './booking_vehicle.controller';
import { BookingVehicleService } from './booking_vehicle.service';

@Module({
  controllers: [BookingVehicleController],
  providers: [BookingVehicleService]
})
export class BookingVehicleModule {}
