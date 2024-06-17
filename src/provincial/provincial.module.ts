import { Module } from '@nestjs/common';
import { ProvincialController } from './provincial.controller';
import { ProvincialService } from './provincial.service';

@Module({
  controllers: [ProvincialController],
  providers: [ProvincialService]
})
export class ProvincialModule {}
