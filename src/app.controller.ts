import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('vehicle')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  welcomeMessage(): string {
    return this.appService.welcomeMessage();
  }
}
