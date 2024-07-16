/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PublicService } from './public.service';
import { PublicController } from './public.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstablishmentEntity } from 'src/establishment/entities/establishment.entity/establishment.entity';
import { CountryEntity } from 'src/country/entities/country.entity/country.entity';
import { ProvincialEntity } from 'src/provincial/entities/provincial.entity/provincial.entity';
import { TownshipEntity } from 'src/township/entities/township.entity/township.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EstablishmentEntity,
      CountryEntity,
      ProvincialEntity,
      TownshipEntity,
    ]),
  ],
  controllers: [PublicController],
  providers: [PublicService],
})
export class PublicModule {}
