/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository, } from 'typeorm';
import { EstablishmentEntity } from 'src/establishment/entities/establishment.entity/establishment.entity';
import { RoomEntity } from 'src/room/entities/room.entity/room.entity';
import { ProvincialEntity } from 'src/provincial/entities/provincial.entity/provincial.entity';
import { RoleEntity } from 'src/role/entities/role.entity/role.entity';
import { UserEntity } from 'src/user/entities/user.entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UserRoleEntity } from 'src/user_role/entities/user_role.entity/user_role.entity';
import { AddCustomerDto } from 'src/user/dto/addCustomer.dto';

@Injectable()
export class PublicService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,

    private readonly dataSource: DataSource) {}
  
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

  async createUser(addUserDto: AddCustomerDto): Promise<any> {
      
      const queryRunner = this.dataSource.createQueryRunner();

      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
          // const { role_id,  } = addUserDto;

          const roleFound = await queryRunner.manager.findOne(RoleEntity, {
              where: {
                name_role: 'customer',
              },
          });

          if(! roleFound) {
              return null;
          }else {

              const user = this.userRepository.create({
                  ...addUserDto,
              });

              user.wallet = 0;
              const salt = await bcrypt.genSalt();
              user.password = await bcrypt.hash(user.password, salt);

              const userCreated = await queryRunner.manager.save(UserEntity, user);

              const role = new UserRoleEntity();
              role.user = userCreated;
              role.role = roleFound;

              await queryRunner.manager.save(UserRoleEntity, role);

              await queryRunner.commitTransaction();

              return {
                  "uuid" : userCreated.uuid,
                  "username": userCreated.username,
                  "firstname": userCreated.firstname,
                  "middlename": userCreated.middlename,
                  "lastname": userCreated.lastname,
                  "email": userCreated.email,
                  "wallet": userCreated.wallet,
                  "birthdate": userCreated.birthdate,
              };
          }

      } catch (error) {
          await queryRunner.rollbackTransaction();
          throw new NotFoundException("Request failed, please try again " + error);
      } finally {
          await queryRunner.release();
      }
  }

  async getRoles(): Promise<any> {
    return await this.roleRepository.find({
        order: {
            id: 'DESC',
        },
    });
  }

  // update(id: number, updatePublicDto: UpdatePublicDto) {
  //   return `This action updates a #${id} public`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} public`;
  // }
}
