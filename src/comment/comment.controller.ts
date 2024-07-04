import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/jwt/auth.guard';

@ApiTags('comment')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('comment')
export class CommentController {}
