import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CountryEntity } from './entities/country.entity/country.entity';
import { AddCountryDto } from './dto/addCountry.dto';

@Injectable()
export class CountryService {
    constructor(
        @InjectRepository(CountryEntity)
        private readonly countryRepository: Repository<CountryEntity>
    ){}

    async getCountries(): Promise<any> {
        return await this.countryRepository.find({
            order: {
                id: 'DESC',
            },
        });
    }

    async getCountry(id: string): Promise<CountryEntity> {
        return await this.countryRepository.findOne({
            where: {
                uuid: id,
            }
         });
    }

    async createCountry(data: AddCountryDto): Promise<any> {
        try {
            return await this.countryRepository.save(data);
        } catch (error) {
            new BadRequestException('Bad request, please try again')
        }
    }
}
