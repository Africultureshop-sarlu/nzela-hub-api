import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('room')
@Controller('room')
export class RoomController {}
