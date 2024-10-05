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
import { TypeRoomEntity } from 'src/type_room/entities/type_room.entity/type_room.entity';
import { TypeEstablishmentEntity } from 'src/type_establishment/entities/type_establishment.entity/type_establishment.entity';
import { TownshipEntity } from 'src/township/entities/township.entity/township.entity';

@Injectable()
export class PublicService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,

    
    @InjectRepository(EstablishmentEntity)
    private readonly establishmentRepository: Repository<EstablishmentEntity>,    
    @InjectRepository(TypeRoomEntity)
    private readonly typeRoomRepository: Repository<TypeRoomEntity>,
    @InjectRepository(RoomEntity)
    private readonly roomRepository: Repository<RoomEntity>,
    @InjectRepository(TypeEstablishmentEntity)
    private readonly typeEstablishmentRepository: Repository<TypeEstablishmentEntity>,
    @InjectRepository(TownshipEntity)
    private readonly townshipRepository: Repository<TownshipEntity>,
    @InjectRepository(UserRoleEntity)
    private readonly userRoleRepository: Repository<UserRoleEntity>,

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
            city: {
              provincial:{
                country: true,
              }
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
          cities: true,
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
          cities: {
            townships: true,
          },
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
          cities: {
            townships: true,
          }
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
            city: {
              provincial:  {
                country: true,
              }
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
        .leftJoinAndSelect('township.city', 'city')
        .leftJoinAndSelect('city.provincial', 'provincial');

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
  
  async seedingEstablishments(addUserDto: AddCustomerDto): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const roomSimple = await this.typeRoomRepository.findOne({ where: { name_type_room: 'Chambre simple'}});
      const roomStandard = await this.typeRoomRepository.findOne({ where: { name_type_room: 'Chambre double standard'}});
      const roomLuxe = await this.typeRoomRepository.findOne({ where: { name_type_room: '"Chambre double de luxe'}});

      const zeroStart = await this.typeEstablishmentRepository.findOne({ where: { name_type_establishment: 0 }});
      const oneStart = await this.typeEstablishmentRepository.findOne({ where: { name_type_establishment: 1 }});
      const twoStart = await this.typeEstablishmentRepository.findOne({ where: { name_type_establishment: 2 }});
      const threeStart = await this.typeEstablishmentRepository.findOne({ where: { name_type_establishment: 3 }});

      const LingwalaTownship = await this.townshipRepository.findOne({ where: { township_name: "lingwala"}});
      const gombeTownship =  await this.townshipRepository.findOne({ where: { township_name: "gombe" }});
      const limeteTownship = await this.townshipRepository.findOne({ where: { township_name: "limete" }});
      const tshelaTownship = await this.townshipRepository.findOne({ where: { township_name: "Tshela"} });
      const gombeMatadiTownship = await this.townshipRepository.findOne({ where: { township_name: "Gombe - Matadi" }});
      const kwengeTownship = await this.townshipRepository.findOne({ where: { township_name: "Kwenge" }});
      const kwiluTownship = await this.townshipRepository.findOne({ where: { township_name: "Kwilu" }});

      const townships = [
        LingwalaTownship,
        gombeTownship,
        limeteTownship,
        tshelaTownship,
        gombeMatadiTownship,
        kwengeTownship,
        kwiluTownship,
      ];
      const establishmentTypes = [
        zeroStart,
        oneStart,
        twoStart,
        threeStart,
      ];
      const roomTypes = [
        roomSimple,
        roomStandard,
        roomLuxe,
      ];
      const managerRole = await queryRunner.manager.findOne(RoleEntity, {
        where: {
          name_role: 'manager',
        },
      });

      for (const township of townships) {
        const townshipEntity = await this.townshipRepository.findOne({ where: { township_name: township.township_name } });
    
        for (const establishmentType of establishmentTypes) {
          const typeEstablishment = await this.typeEstablishmentRepository.findOne({ where: { name_type_establishment: establishmentType.name_type_establishment } });
    
          // const user = new UserEntity();          
          const user = {
              ...addUserDto,
              lastname: `establishment${establishmentType.name_type_establishment}-${township.township_name}`,
              firstname: `establishment${establishmentType.name_type_establishment}-${township.township_name}`,
              wallet: 0,
              email: `establishment${establishmentType.name_type_establishment}-${township.township_name}@gmail.com`,
              password: await bcrypt.hash(`establishment${establishmentType.name_type_establishment}-${township.township_name}`, 10),
          };
          // console.log(user);
          // user.lastname = `establishment${establishmentType.name_type_establishment}-${township.township_name}`;
          // user.firstname =`establishment${establishmentType.name_type_establishment}-${township.township_name}`;
          // user.wallet = 0;
          // user.email = `establishment${establishmentType.name_type_establishment}-${township.township_name}@gmail.com`;
          // user.password = await bcrypt.hash(`establishment${establishmentType.name_type_establishment}-${township.township_name}`, 10);

          const userCreated = await this.userRepository.save(user);
          // const userCreated = await queryRunner.manager.save(UserEntity, user);
          console.log("userCreated ==> ", userCreated);
          const userRoleAdminCreated = this.userRoleRepository.create({
            user: user,
            role: managerRole,
          })
          await this.userRepository.save(userRoleAdminCreated);

          const rooms = [];
          for (const roomType of roomTypes) {
            const typeRoom = await this.typeRoomRepository.findOne({ where: { name_type_room: roomType.name_type_room } });
            const room = this.roomRepository.create({
              name_room: `${roomType.name_type_room} - ${township.township_name}`,
              price_per_night: Math.floor(Math.random() * 100) + 50,
              advantage: JSON.parse('["internet", "swimming pool"]'),
              pictures: JSON.parse('["picture1.jpg", "picture2.jpg", "picture3.jpg"]'),
              type_room: typeRoom,
            });
            rooms.push(room);
          }
          await this.roomRepository.save(rooms);
    
          const establishment = this.establishmentRepository.create({
            name_establishment: `Establishment ${establishmentType.name_type_establishment} - ${township.township_name}`,
            email: `example${establishmentType.name_type_establishment}-${township.township_name}@gmail.com`,
            township: townshipEntity,
            type_establishment: typeEstablishment,
            rooms: rooms,
            user: user,
          });
          await this.establishmentRepository.save(establishment);
        }
      }
      await queryRunner.commitTransaction();
      return 'succesfull';
      
    } catch (error) {
      throw new NotFoundException('Request failed, please try again', error);
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
