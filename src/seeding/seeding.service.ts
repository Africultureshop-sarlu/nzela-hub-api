/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity/user.entity';
import { RoleEntity } from 'src/role/entities/role.entity/role.entity';
import { UserRoleEntity } from 'src/user_role/entities/user_role.entity/user_role.entity';
import * as bcrypt from 'bcrypt';
import * as dotenv from "dotenv";
import { CountryEntity } from 'src/country/entities/country.entity/country.entity';
import { ProvincialEntity } from 'src/provincial/entities/provincial.entity/provincial.entity';
import { TownshipEntity } from 'src/township/entities/township.entity/township.entity';
import { TypeEstablishmentEntity } from 'src/type_establishment/entities/type_establishment.entity/type_establishment.entity';

dotenv.config();

@Injectable()
export class SeedingService {

  constructor(
    private readonly  dataSource: DataSource,
  ){}


  async create() {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const userRepository = queryRunner.manager.getRepository(UserEntity);
      const roleRepository = queryRunner.manager.getRepository(RoleEntity);
      const userRoleRepository = queryRunner.manager.getRepository(UserRoleEntity);
      const typeEstablishmentRepository = queryRunner.manager.getRepository(TypeEstablishmentEntity);
      const countryRepository = queryRunner.manager.getRepository(CountryEntity);
      const provincialRepository = queryRunner.manager.getRepository(ProvincialEntity);
      const townshipRepository = queryRunner.manager.getRepository(TownshipEntity);

      const adminRole = roleRepository.create({
        name_role: "admin",
        description_role: "admin",
      });
      const supportRole = roleRepository.create({
        name_role: "support",
        description_role: "support",
      });
      const managerRole = roleRepository.create({
        name_role: "manager",
        description_role: "manager",
      });
      const customerRole = roleRepository.create({
        name_role: "customer",
        description_role: "customer",
      });
      const supportEstablishmentRole = roleRepository.create({
        name_role: "support_establishment",
        description_role: "support_establishment",
      });

      await roleRepository.save([adminRole, supportRole, managerRole, customerRole, supportEstablishmentRole]);

      const userSalt = await bcrypt.genSalt();
      const adminUser = new UserEntity();
      
      adminUser.username= process.env.ADMIN_MAIL;
      adminUser.password= await bcrypt.hash(process.env.ADMIN_PASSWORD, userSalt);
      adminUser.email= process.env.ADMIN_MAIL;
      adminUser.firstname= "admin";
      adminUser.lastname= "admin";
      adminUser.wallet= 0;      

      await userRepository.save(adminUser);
      const userRoleAdminCreated = userRoleRepository.create({
        user: adminUser,
        role: adminRole,
      })
      await userRepository.save(userRoleAdminCreated);

      const rdcCountry = countryRepository.create({
        name_country: "République démocratique du Congo",
        area_code: "243"
      });
      await countryRepository.save(rdcCountry);

      const kinProvincial = provincialRepository.create({
        provincial_name: "Kinshasa",
        country: rdcCountry,
      });
      const kongoCentralProvincial = provincialRepository.create({
        provincial_name: "Kongo-Central",
        country: rdcCountry,
      });
      const hautKatangaProvincial = provincialRepository.create({
        provincial_name: "Haut-Katanga",
        country: rdcCountry,
      });
      const EquateurProvincial = provincialRepository.create({
        provincial_name: "Équateur",
        country: rdcCountry,
      });

      await provincialRepository.save([kinProvincial, kongoCentralProvincial, hautKatangaProvincial, EquateurProvincial]);

      const townshipsCreated = townshipRepository.create([
        {
          township_name: 'Gombe',
          provincial: kinProvincial,
        },
        {
          township_name: 'Bandalungwa',
          provincial: kinProvincial,
        },
        {
          township_name: 'Bumbu',
          provincial: kinProvincial,
        },
        {
          township_name: 'Kalamu',
          provincial: kinProvincial,
        },
        {
          township_name: 'Kasa-Vubu',
          provincial: kinProvincial,
        },
        {
          township_name: 'Makala',
          provincial: kinProvincial,
        },
        {
          township_name: 'Ngiri-Ngiri',
          provincial: kinProvincial,
        },
        {
          township_name: 'Selembao',
          provincial: kinProvincial,
        },
        {
          township_name: 'Kisenso',
          provincial: kinProvincial,
        },
        {
          township_name: 'Lemba',
          provincial: kinProvincial,
        },
        {
          township_name: 'Limete',
          provincial: kinProvincial,
        },
        {
          township_name: 'Matete',
          provincial: kinProvincial,
        },
        {
          township_name: 'Ngaba',
          provincial: kinProvincial,
        },
        {
          township_name: 'Barumbu',
          provincial: kinProvincial,
        },
        {
          township_name: 'Kinshasa',
          provincial: kinProvincial,
        },
        {
          township_name: 'Kintambo',
          provincial: kinProvincial,
        },
        {
          township_name: 'Lingwala',
          provincial: kinProvincial,
        },
        {
          township_name: 'Ngaliema',
          provincial: kinProvincial,
        },
        {
          township_name: 'Mont-Ngafula',
          provincial: kinProvincial,
        },
        {
          township_name: 'Kimbanseke',
          provincial: kinProvincial,
        },
        {
          township_name: 'Kimbanseke',
          provincial: kinProvincial,
        },
        {
          township_name: 'Masina',
          provincial: kinProvincial,
        },
        {
          township_name: 'Ndjili',
          provincial: kinProvincial,
        },
        {
          township_name: 'Nsele',
          provincial: kinProvincial,
        },
      ]);
      await townshipRepository.save(townshipsCreated);

      const typeEstablishmentCreated = typeEstablishmentRepository.create([
        {
          name_type_establishment: 5,
          description_type_establishment: "Hôtel 5 étoiles",
        },
        {
          name_type_establishment: 4,
          description_type_establishment: "Hôtel 4 étoiles",
        },
        {
          name_type_establishment: 3,
          description_type_establishment: "Hôtel 3 étoiles",
        },
        {
          name_type_establishment: 2,
          description_type_establishment: "Hôtel 2 étoiles",
        },
        {
          name_type_establishment: 1,
          description_type_establishment: "Hôtel 1 étoile",
        }
      ]);      

      await typeEstablishmentRepository.save(typeEstablishmentCreated);

      await queryRunner.commitTransaction();

      return typeEstablishmentCreated;

    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new NotFoundException(`${error.message}`);
    }finally {
      await queryRunner.release();
    }

  }

  findAll() {
    return `This action returns all seeding`;
  }

  findOne(id: number) {
    return `This action returns a #${id} seeding`;
  }
}
