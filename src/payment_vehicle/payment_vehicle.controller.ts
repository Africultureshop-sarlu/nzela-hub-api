import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('payment-vehicle')
@Controller('payment-vehicle')
export class PaymentVehicleController {}
