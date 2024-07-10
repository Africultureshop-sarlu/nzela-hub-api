import { Module } from '@nestjs/common';
import { EmailServerService } from './email-server.service';
import { EmailServerController } from './email-server.controller';

@Module({
  providers: [EmailServerService],
  controllers: [EmailServerController]
})
export class EmailServerModule {}
