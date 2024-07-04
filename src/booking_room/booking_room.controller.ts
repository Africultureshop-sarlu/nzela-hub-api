import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/jwt/auth.guard';

@ApiTags('booking-room')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('booking-room')
export class BookingRoomController {}
