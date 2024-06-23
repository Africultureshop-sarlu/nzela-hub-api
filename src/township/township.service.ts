import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TownshipEntity } from './entities/township.entity/township.entity';
import { Repository } from 'typeorm';
import { ProvincialEntity } from 'src/provincial/entities/provincial.entity/provincial.entity';
import { addTownshipDto } from './dto/addTownship.dto';

@Injectable()
export class TownshipService {
    constructor(
        @InjectRepository(TownshipEntity)
        private readonly townshipRepository: Repository<TownshipEntity>,

        @InjectRepository(ProvincialEntity)
        private readonly provincialRepository: Repository<ProvincialEntity>
    ){}

    async getTownships(): Promise<any>{
        return await this.townshipRepository.find({
            order: {
                id: 'DESC'
            }
        })
    }

    async createTownship(addTownshipDto: addTownshipDto): Promise<any>{
        try {
            const { provincial_id, township_name, description_township } = addTownshipDto;

            const provincialFound = await this.provincialRepository.findOne({
                where: {
                    uuid: provincial_id
                }
            })
            if(! provincialFound){
                return null;
            }
            const township = new TownshipEntity();
            township.provincial = provincialFound;
            township.description_township = description_township;
            township.township_name = township_name;

            const townshipCreated = await this.townshipRepository.save(township);

            return townshipCreated;
        } catch (error) {
            throw new NotFoundException('Reuest failed, please try again')
        }

    }
}
