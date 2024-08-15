/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Between, DataSource, In, LessThanOrEqual } from 'typeorm';
import { EstablishmentEntity } from 'src/establishment/entities/establishment.entity/establishment.entity';
import { RoomEntity } from 'src/room/entities/room.entity/room.entity';
import { ProvincialEntity } from 'src/provincial/entities/provincial.entity/provincial.entity';

@Injectable()
export class PublicService {
  constructor(private readonly dataSource: DataSource) {}

  // create(createPublicDto: CreatePublicDto) {
  //   return 'This action adds a new public';
  // }

  async findAll() {
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      const establishmentRepository =
        queryRunner.manager.getRepository(EstablishmentEntity);

      const result = await establishmentRepository.find({
        order: {
          id: 'DESC',
        },
        relations: {
          township: {
            provincial: {
              country: true,
            },
          },
          rooms: {
            type_room: true,
          },
          type_establishment: true,
        },
      });
      return result;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findEstablishments() : Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    const establishmentRepository = queryRunner.manager.getRepository(EstablishmentEntity);
    try {

      const numberOfEstablishments = await establishmentRepository.count();
      const page: any = numberOfEstablishments / 10;

      const establishments = await establishmentRepository.find({
        order: {
          id: "DESC",
        },
        skip: 0,
        take: 10,
        relations: {
          rooms: true,
        }
      })

      return {
        "numberOfEstablishments" : numberOfEstablishments,
        "establishments": establishments,
        "pages" : parseInt(page) + 1,
      }
      
    } catch (error) {
      throw new NotFoundException(error.message);      
    }
  }

  async findProvincials(): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    const provincialRepository = queryRunner.manager.getRepository(ProvincialEntity);
    try {

      const provincials: ProvincialEntity[] = await provincialRepository.find({
        order: {
          id: "DESC",
        },
        relations: {
          townships: true,
        }
      })

      return provincials;
      
    } catch (error) {
      throw new NotFoundException(error.message);      
    }
  }

  async findProvincial(uuid: string): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    const provincialRepository = queryRunner.manager.getRepository(ProvincialEntity);
    try {

      const provincial: ProvincialEntity = await provincialRepository.findOne({
        order: {
          id: "DESC",
        },
        relations: {
          townships: true,
        },
        where: {
          uuid
        }
      })

      return provincial;
      
    } catch (error) {
      throw new NotFoundException(error.message);      
    }
  }

  async findProvincialByName(name_provincial: string): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    const provincialRepository = queryRunner.manager.getRepository(ProvincialEntity);
    try {

      const provincial: ProvincialEntity = await provincialRepository.findOne({
        order: {
          id: "DESC",
        },
        relations: {
          townships: true,
        },
        where: {
          provincial_name: name_provincial,
        }
      })

      return provincial;
      
    } catch (error) {
      throw new NotFoundException(error.message);      
    }
  }

  async findOne(uuid: string) {
    
    const queryRunner = this.dataSource.createQueryRunner();
    const establishmentRepository = queryRunner.manager.getRepository(EstablishmentEntity);
    try {

      const establishments = await establishmentRepository.findOne({
        order: {
          id: "DESC",
        },
        relations: {
          rooms: {
            type_room: true,
          },
          type_establishment: true,
          township: {
            provincial: {
              country: true,
            }
          }
        },
        where: {
          uuid: uuid,
        }
      })

      return establishments;
      
    } catch (error) {
      throw new NotFoundException(error.message);      
    }
  }

  async findRoomsByEstablishment(uuid: string) {
    
    const queryRunner = this.dataSource.createQueryRunner();
    const establishmentRepository = queryRunner.manager.getRepository(EstablishmentEntity);
    const roomRepository = queryRunner.manager.getRepository(RoomEntity);

    try {
      const establishment = await establishmentRepository.findOne({
        where: {
          uuid: uuid,
        }
      });

      if( ! establishment) {        
        throw new NotFoundException(`This establishment does not exist`); 
      }

      const rooms = await roomRepository.find({
        relations: {
          type_room: true,
          establishment: true,
        },
        where: {          
          establishment: {
             uuid: establishment.uuid,
          },
        }
      });

      return rooms;
      
    } catch (error) {
      throw new NotFoundException(error.message);      
    }
  }

  async findRoomsByFilter(filter: any) {
    
    const queryRunner = this.dataSource.createQueryRunner();
    // const establishmentRepository = queryRunner.manager.getRepository(EstablishmentEntity);
    const roomRepository = queryRunner.manager.getRepository(RoomEntity);

    try {

      const query = roomRepository.createQueryBuilder('room')
        .leftJoinAndSelect('room.booking_rooms', 'booking_rooms')
        .leftJoinAndSelect('room.establishment', 'establishment')
        .leftJoinAndSelect('establishment.township', 'township')
        .leftJoinAndSelect('township.provincial', 'provincial');
        // .leftJoinAndSelect('room.booking_room', 'booking_room');

      if (filter.type) {
        query.andWhere('room.type_room.name_type_room = :type', { type: filter.type });
      }

      if (filter.provincial) {
        query.andWhere('provincial.provincial_name = :province', { province: filter.provincial });
      }

      if (filter.townships && filter.townships.length > 0) {
        query.andWhere('township IN (:...townships)', { townships: filter.townships });
      }

      if (filter.priceMin && filter.priceMax) {
        query.andWhere('room.price_per_night BETWEEN :min AND :max', { min: filter.priceMin, max: filter.priceMax });
      }

      if (filter.dateStart) {
        query.andWhere('booking_rooms.start_date != :start', { start: filter.dateStart});
      }

      if (filter.dateEnd) {
        query.andWhere('booking_rooms.end_date != :end', { end: filter.dateEnd });
      }

      const rooms = await query.getMany();


      // const whereConditions: any = {};

      // if (filter.type) {
      //   whereConditions.type = filter.type;
      // }

      // if (filter.provincial) {
      //   whereConditions['establishment.township.provincial'] = filter.provincial;
      // }

      // if (filter.townships && filter.townships.length > 0) {
      //   whereConditions['establishment.township'] = In(filter.townships);
      // }

      // if (filter.priceMin && filter.priceMax) {
      //   whereConditions.price_per_night = Between(filter.priceMin, filter.priceMax);
      // }

      // if (filter.dateStart && filter.dateEnd) {
      //   whereConditions.availability_date = Between(filter.dateStart, filter.dateEnd);
      // }

      // const rooms = await roomRepository.find({

      //   relations: {
      //     establishment: {
      //       township: {
      //         provincial: {
      //           country: true,
      //         }
      //       }
      //     } 
      //   },
      //   // where: {
      //   //   price_per_night: LessThanOrEqual(filter.price)
      //   // }
      //   where: whereConditions,
      // });

        return rooms;
      // const establishment = await establishmentRepository.findOne({
      //   where: {
      //     uuid: uuid,
      //   }
      // });

      // if( ! establishment) {        
      //   throw new NotFoundException(`This establishment does not exist`); 
      // }

      // const rooms = await roomRepository.find({
      //   relations: {
      //     type_room: true,
      //     establishment: true,
      //   },
      //   where: {          
      //     establishment: {
      //        uuid: establishment.uuid,
      //     },
      //   }
      // });

      // return rooms;
      
    } catch (error) {
      throw new NotFoundException(error.message);      
    }
  }

  async findOneRoomByEstablishment(uuid: string) {
    
    const queryRunner = this.dataSource.createQueryRunner();
    const roomRepository = queryRunner.manager.getRepository(RoomEntity);

    try {
      const room = await roomRepository.findOne({
        where: {
          uuid: uuid,
        },
        relations: {
          type_room: true,
          establishment: true,
        }
      });

      if( ! room) {        
        throw new NotFoundException(`This room does not exist`); 
      }

      return room;
      
    } catch (error) {
      throw new NotFoundException(error.message);      
    }
  }

  // update(id: number, updatePublicDto: UpdatePublicDto) {
  //   return `This action updates a #${id} public`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} public`;
  // }
}
