import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/jwt/auth.guard';

@ApiTags('type-room')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('type-room')
export class TypeRoomController {}
