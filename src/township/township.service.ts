import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TownshipEntity } from './entities/township.entity/township.entity';
import { Repository } from 'typeorm';
import { addTownshipDto } from './dto/addTownship.dto';
import { CityEntity } from 'src/city/entities/city.entity';

@Injectable()
export class TownshipService {
  constructor(
    @InjectRepository(TownshipEntity)
    private readonly townshipRepository: Repository<TownshipEntity>,

    @InjectRepository(CityEntity)
    private readonly provincialRepository: Repository<CityEntity>,
  ) {}

  async getTownships(): Promise<any> {
    return await this.townshipRepository.find({
      order: {
        id: 'DESC',
      },
    });
  }

  async createTownship(addTownshipDto: addTownshipDto): Promise<any> {
    try {
      const { provincial_id, township_name, description_township } =
        addTownshipDto;

      const cityFound = await this.provincialRepository.findOne({
        where: {
          uuid: provincial_id,
        },
      });
      if (!cityFound) {
        return null;
      }
      const township = new TownshipEntity();
      township.city = cityFound;
      township.description_township = description_township;
      township.township_name = township_name;

      const townshipCreated = await this.townshipRepository.save(township);

      return townshipCreated;
    } catch (error) {
      throw new NotFoundException('Reuest failed, please try again');
    }
  }
}
