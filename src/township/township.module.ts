import { Module } from '@nestjs/common';
import { TownshipController } from './township.controller';
import { TownshipService } from './township.service';

@Module({
  controllers: [TownshipController],
  providers: [TownshipService]
})
export class TownshipModule {}
