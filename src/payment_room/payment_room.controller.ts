import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/jwt/auth.guard';

@ApiTags('payment-room')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('payment-room')
export class PaymentRoomController {}
