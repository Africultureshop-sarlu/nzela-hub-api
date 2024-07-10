/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { EstablishmentEntity } from './entities/establishment.entity/establishment.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AddEstablishmentDto } from './dto/addEstablishment.dto';
import { TownshipEntity } from 'src/township/entities/township.entity/township.entity';
import { TypeEstablishmentEntity } from 'src/type_establishment/entities/type_establishment.entity/type_establishment.entity';
import { UserEntity } from 'src/user/entities/user.entity/user.entity';
import * as bcrypt from 'bcrypt';
import { UserRoleEntity } from 'src/user_role/entities/user_role.entity/user_role.entity';
import { RoleEntity } from 'src/role/entities/role.entity/role.entity';

@Injectable()
export class EstablishmentService {
  constructor(
    @InjectRepository(EstablishmentEntity)
    private readonly establishmentRespository: Repository<EstablishmentEntity>,

    @InjectRepository(TownshipEntity)
    private readonly townshipRespository: Repository<TownshipEntity>,

    @InjectRepository(TypeEstablishmentEntity)
    private readonly typeEstablishmentRespository: Repository<TypeEstablishmentEntity>,

    private readonly dataSource: DataSource,
  ) {}

  async getEstablishments(): Promise<EstablishmentEntity[]> {
    return await this.establishmentRespository.find({
      order: {
        id: 'DESC',
      },
    });
  }

  async createEstablishments(
    addEstablishmentDto: AddEstablishmentDto,
  ): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const {
        township_id,
        type_establishment_id,
        name_establishment,
        address,
        latitude,
        longitude,
        zipcode,
        phone,
        email,
        applicable_tax,
        percentage_applicable_tax,
        pictures,
        settings,
      } = addEstablishmentDto;

      const townshipFound: TownshipEntity =
        await this.townshipRespository.findOne({
          relations: {
            provincial: true,
          },
          where: {
            uuid: township_id,
          },
        });

      const typeEstablishmentFound: TypeEstablishmentEntity =
        await this.typeEstablishmentRespository.findOne({
          where: {
            uuid: type_establishment_id,
          },
        });

      if (!typeEstablishmentFound || !townshipFound) {
        return null;
      }
      const role = await queryRunner.manager.findOne(RoleEntity, {
        where: {
          name_role: 'manager',
        },
      });

      const user = new UserEntity();

      user.firstname = name_establishment;
      user.lastname = name_establishment;
      user.email = email;
      user.salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(name_establishment, user.salt);

      const userCreated = await queryRunner.manager.save(UserEntity, user);

      const userRole = new UserRoleEntity();
      userRole.user = userCreated;
      userRole.role = role;

      await queryRunner.manager.save(UserRoleEntity, userRole);

      const establishment = new EstablishmentEntity();

      establishment.township = townshipFound;
      establishment.type_establishment = typeEstablishmentFound;
      establishment.name_establishment = name_establishment;
      establishment.address = address;
      establishment.city = townshipFound.provincial.provincial_name;
      establishment.applicable_tax = applicable_tax;
      establishment.percentage_applicable_tax = percentage_applicable_tax;
      establishment.phone = phone;
      establishment.pictures = pictures;
      establishment.settings = settings;
      establishment.zipcode = zipcode;
      establishment.latitude = latitude;
      establishment.longitude = longitude;
      establishment.email = email;
      establishment.user = userCreated;      

      // const establishmentCreated = await this.establishmentRespository.save(establishment);

      const establishmentCreated = await queryRunner.manager.save(
        EstablishmentEntity,
        establishment,
      );

      await queryRunner.commitTransaction();

      return establishmentCreated;
    } catch (error) {
      throw new NotFoundException('Request failed, please try again');
    }
  }

  async getEstablishment(uuid: string): Promise<any> {
    const dataEstablishment = await this.establishmentRespository.findOne({
      where: {
        uuid: uuid,
      },
      relations: {
        type_establishment: true,
      },
    });
    return dataEstablishment;
  }
}
