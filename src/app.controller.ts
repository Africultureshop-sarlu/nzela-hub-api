import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

// @ApiTags('vehicle')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiTags('')
  @Get("/api")
  welcomeMessage(): string {
    return this.appService.welcomeMessage();
  }
}
