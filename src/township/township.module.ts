import { Module } from '@nestjs/common';
import { TownshipController } from './township.controller';
import { TownshipService } from './township.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TownshipEntity } from './entities/township.entity/township.entity';
import { ProvincialEntity } from 'src/provincial/entities/provincial.entity/provincial.entity';
import { CityEntity } from 'src/city/entities/city.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TownshipEntity, ProvincialEntity, CityEntity])],
  controllers: [TownshipController],
  providers: [TownshipService],
})
export class TownshipModule {}
