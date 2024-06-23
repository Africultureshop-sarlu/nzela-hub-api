import { Module } from '@nestjs/common';
import { ProvincialController } from './provincial.controller';
import { ProvincialService } from './provincial.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProvincialEntity } from './entities/provincial.entity/provincial.entity';
import { CountryEntity } from 'src/country/entities/country.entity/country.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProvincialEntity, CountryEntity])],
  controllers: [ProvincialController],
  providers: [ProvincialService],
})
export class ProvincialModule {}
