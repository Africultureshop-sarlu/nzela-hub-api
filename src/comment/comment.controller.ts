import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/jwt/auth.guard';

@ApiTags('api/comment')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('api/comment')
export class CommentController {}
