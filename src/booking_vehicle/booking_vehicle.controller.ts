import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/jwt/auth.guard';

@ApiTags('api/booking-vehicle')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('api/booking-vehicle')
export class BookingVehicleController {}
