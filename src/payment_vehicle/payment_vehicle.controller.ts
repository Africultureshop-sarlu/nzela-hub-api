import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/jwt/auth.guard';

@ApiTags('api/payment-vehicle')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('api/payment-vehicle')
export class PaymentVehicleController {}
