import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/jwt/auth.guard';

@ApiTags('room')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('room')
export class RoomController {}
