import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/jwt/auth.guard';

@ApiTags('api/payment-room')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('api/payment-room')
export class PaymentRoomController {}
