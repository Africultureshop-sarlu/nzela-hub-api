import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/jwt/auth.guard';

@ApiTags('booking-vehicle')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('booking-vehicle')
export class BookingVehicleController {}
