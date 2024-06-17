import { Module } from '@nestjs/common';
import { PaymentVehicleController } from './payment_vehicle.controller';
import { PaymentVehicleService } from './payment_vehicle.service';

@Module({
  controllers: [PaymentVehicleController],
  providers: [PaymentVehicleService]
})
export class PaymentVehicleModule {}
