import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProvincialEntity } from './entities/provincial.entity/provincial.entity';
import { Repository } from 'typeorm';
import { AddProvinceDto } from './dto/addProvincial.dto';
import { CountryEntity } from 'src/country/entities/country.entity/country.entity';

@Injectable()
export class ProvincialService {
    constructor(
        @InjectRepository(ProvincialEntity)
        private readonly provinceRepository: Repository<ProvincialEntity>,

        @InjectRepository(CountryEntity)
        private readonly countryRepository: Repository<CountryEntity>
    ){}

    async getProvincials(): Promise<any>{
        return await this.provinceRepository.find({
            order: {
                id: "DESC"
            }
        })
    }

    async createProvincial(data: AddProvinceDto): Promise<any>{
        try {
            const { country_id, provincial_name, description } = data;

            const countryFind = await this.countryRepository.findOne({
                where: {
                    uuid: country_id,
                }
            });

            if(countryFind === null){
                return null;
            }else{
                const provincial = new ProvincialEntity();

                provincial.country = countryFind;
                provincial.provincial_name = provincial_name;
                provincial.description = description;

                return await this.provinceRepository.save(provincial);
            }
            
        } catch (error) {
            new BadRequestException('Bad request, please try again')
        }
    }
}
