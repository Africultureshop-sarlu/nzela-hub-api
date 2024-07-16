/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { EstablishmentEntity } from 'src/establishment/entities/establishment.entity/establishment.entity';
import { RoomEntity } from 'src/room/entities/room.entity/room.entity';

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
