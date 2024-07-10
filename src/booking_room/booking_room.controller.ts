import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/jwt/auth.guard';

@ApiTags('api/booking-room')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('api/booking-room')
export class BookingRoomController {}
