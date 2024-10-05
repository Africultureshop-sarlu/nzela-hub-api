/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
// import { UserEntity } from 'src/user/entities/user.entity/user.entity';
import { RoleEntity } from 'src/role/entities/role.entity/role.entity';
// import { UserRoleEntity } from 'src/user_role/entities/user_role.entity/user_role.entity';
// import * as bcrypt from 'bcrypt';
import * as dotenv from "dotenv";
import { CountryEntity } from 'src/country/entities/country.entity/country.entity';
import { ProvincialEntity } from 'src/provincial/entities/provincial.entity/provincial.entity';
import { TownshipEntity } from 'src/township/entities/township.entity/township.entity';
import { TypeEstablishmentEntity } from 'src/type_establishment/entities/type_establishment.entity/type_establishment.entity';
import { CityEntity } from 'src/city/entities/city.entity';
// import { EstablishmentEntity } from 'src/establishment/entities/establishment.entity/establishment.entity';
import { TypeRoomEntity } from 'src/type_room/entities/type_room.entity/type_room.entity';
// import { RoomEntity } from 'src/room/entities/room.entity/room.entity';

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
      // const userRepository = queryRunner.manager.getRepository(UserEntity);
      // const userRoleRepository = queryRunner.manager.getRepository(UserRoleEntity);
      // const establishmentRepository = queryRunner.manager.getRepository(EstablishmentEntity);
      // const roomRepository = queryRunner.manager.getRepository(RoomEntity);
      const roleRepository = queryRunner.manager.getRepository(RoleEntity);
      const typeEstablishmentRepository = queryRunner.manager.getRepository(TypeEstablishmentEntity);
      const countryRepository = queryRunner.manager.getRepository(CountryEntity);
      const provincialRepository = queryRunner.manager.getRepository(ProvincialEntity);
      const townshipRepository = queryRunner.manager.getRepository(TownshipEntity);
      const cityRepository = queryRunner.manager.getRepository(CityEntity);
      const typeRoomRepository = queryRunner.manager.getRepository(TypeRoomEntity);

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

      // const userSalt = await bcrypt.genSalt();
      // const adminUser = new UserEntity();
      
      // adminUser.username = process.env.ADMIN_MAIL;
      // adminUser.email = process.env.ADMIN_MAIL;
      // adminUser.password = await bcrypt.hash(process.env.ADMIN_PASSWORD, userSalt);

      // if (!adminUser.email || !adminUser.password) {
      //   throw new Error('ADMIN_MAIL and ADMIN_PASSWORD must be defined in environment variables');
      // }
      
      // adminUser.firstname = "admin";
      // adminUser.lastname = "admin1";
      // adminUser.wallet = 0;      
      // await queryRunner.manager.save(UserEntity, adminUser);
      // const userRoleAdminCreated = userRoleRepository.create({
      //   user: adminUser,
      //   role: adminRole,
      // })
      // await userRepository.save(userRoleAdminCreated);

      // const adminUser = userRepository.create({
      //   firstname: 'admin',
      //   lastname: 'admin1',
      //   email: process.env.ADMIN_MAIL,
      //   username: process.env.ADMIN_MAIL,
      //   wallet: 0,
      //   password: await bcrypt.hash(process.env.ADMIN_PASSWORD, userSalt)
      // })   
      // return adminUser;
      // await userRepository.save(adminUser);
   
      const rdcCountry = countryRepository.create({
        name_country: "République démocratique du Congo",
        area_code: "243"
      });
      await countryRepository.save(rdcCountry);

      const kinshasaProvincial = provincialRepository.create({
        provincial_name: "Kinshasa",
        country: rdcCountry,
      });

      const hautLomamiProvincial = provincialRepository.create({
        provincial_name: "haut-lomami",
        country: rdcCountry,
      });
      
      const basUeleProvincial = provincialRepository.create({
        provincial_name: "bas-uele",
        country: rdcCountry,
      });
      
      const equateurProvincial = provincialRepository.create({
        provincial_name: "equateur",
        country: rdcCountry,
      });
      
      const hautKatangaProvincial = provincialRepository.create({
        provincial_name: "haut-katanga",
        country: rdcCountry,
      });
      
      const hautLomamiProvincial2 = provincialRepository.create({
        provincial_name: "haut-lomami",
        country: rdcCountry,
      });
      
      const hautUeleProvincial = provincialRepository.create({
        provincial_name: "haut-uele",
        country: rdcCountry,
      });
      
      const ituriProvincial = provincialRepository.create({
        provincial_name: "ituri",
        country: rdcCountry,
      });
      
      const kasaiProvincial = provincialRepository.create({
        provincial_name: "kasai",
        country: rdcCountry,
      });
      
      const kasaiCentralProvincial = provincialRepository.create({
        provincial_name: "kasai-central",
        country: rdcCountry,
      });
      
      const kasaiOrientalProvincial = provincialRepository.create({
        provincial_name: "kasai-oriental",
        country: rdcCountry,
      });
      
      const kongoCentralProvincial = provincialRepository.create({
        provincial_name: "kongo-central",
        country: rdcCountry,
      });
      
      const kwangoProvincial = provincialRepository.create({
        provincial_name: "kwango",
        country: rdcCountry,
      });
      
      const kwiluProvincial = provincialRepository.create({
        provincial_name: "kwilu",
        country: rdcCountry,
      });
      
      const lomamiProvincial = provincialRepository.create({
        provincial_name: "lomami",
        country: rdcCountry,
      });
      
      const lualabaProvincial = provincialRepository.create({
        provincial_name: "lualaba",
        country: rdcCountry,
      });
      
      const maiNdombeProvincial = provincialRepository.create({
        provincial_name: "mai-ndombe",
        country: rdcCountry,
      });
      
      const maniemaProvincial = provincialRepository.create({
        provincial_name: "maniema",
        country: rdcCountry,
      });
      
      const mongalaProvincial = provincialRepository.create({
        provincial_name: "mongala",
        country: rdcCountry,
      });
      
      const nordKivuProvincial = provincialRepository.create({
        provincial_name: "nord-kivu",
        country: rdcCountry,
      });
      
      const nordUbangiProvincial = provincialRepository.create({
        provincial_name: "nord-ubangi",
        country: rdcCountry,
      });
      
      const sankuruProvincial = provincialRepository.create({
        provincial_name: "sankuru",
        country: rdcCountry,
      });
      
      const sudKivuProvincial = provincialRepository.create({
        provincial_name: "sud-kivu",
        country: rdcCountry,
      });
      
      const sudUbangiProvincial = provincialRepository.create({
        provincial_name: "sud-ubangi",
        country: rdcCountry,
      });
      
      const tanganyikaProvincial = provincialRepository.create({
        provincial_name: "tanganyika",
        country: rdcCountry,
      });
      
      const tshopoProvincial = provincialRepository.create({
        provincial_name: "tshopo",
        country: rdcCountry,
      });
      
      const tshuapaProvincial = provincialRepository.create({
        provincial_name: "tshuapa",
        country: rdcCountry,
      });

      await provincialRepository.save([
        hautLomamiProvincial,
        basUeleProvincial,
        equateurProvincial,
        hautKatangaProvincial,
        hautLomamiProvincial2,
        hautUeleProvincial,
        ituriProvincial,
        kasaiProvincial,
        kasaiCentralProvincial,
        kasaiOrientalProvincial,
        kongoCentralProvincial,
        kwangoProvincial,
        kwiluProvincial,
        lomamiProvincial,
        lualabaProvincial,
        maiNdombeProvincial,
        maniemaProvincial,
        mongalaProvincial,
        nordKivuProvincial,
        nordUbangiProvincial,
        sankuruProvincial,
        sudKivuProvincial,
        sudUbangiProvincial,
        tanganyikaProvincial,
        tshopoProvincial,
        tshuapaProvincial,
        kinshasaProvincial,
      ]);

      const citiesCreated = cityRepository.create([
        {
          city_name: 'Kinshasa',
          provincial: kinshasaProvincial,
        },
        {
          city_name: 'Ville de Matadi',
          provincial: kongoCentralProvincial,
        },
        {
          city_name: 'Ville de Boma',
          provincial: kongoCentralProvincial,
        },
        {
          city_name: 'Luozi',
          provincial: kongoCentralProvincial,
        },
        {
          city_name: 'Moanda',
          provincial: kongoCentralProvincial,
        },
        {
          city_name: 'Lukula',
          provincial: kongoCentralProvincial,
        },
        {
          city_name: 'Mbanza-Ngungu',
          provincial: kongoCentralProvincial,
        },
        {
          city_name: 'Tshela',
          provincial: kongoCentralProvincial,
        },
        {
          city_name: 'Seke-Banza',
          provincial: kongoCentralProvincial,
        },
        {
          city_name: 'Songololo',
          provincial: kongoCentralProvincial,
        },
        {
          city_name: 'Kasangulu',
          provincial: kongoCentralProvincial,
        },
        {
          city_name: 'Madimba',
          provincial: kongoCentralProvincial,
        },
        {
          city_name: 'Kimvula',
          provincial: kongoCentralProvincial,
        },
        {
          city_name: 'Ville de Kenge',
          provincial: kwangoProvincial,
        },
        {
          city_name: 'Kasongo Lunda',
          provincial: kwangoProvincial,
        },
        {
          city_name: 'Kenge',
          provincial: kwangoProvincial,
        },
        {
          city_name: 'Feshi',
          provincial: kwangoProvincial,
        },
        {
          city_name: 'Kahemba',
          provincial: kwangoProvincial,
        },
        {
          city_name: 'Popokabaka',
          provincial: kwangoProvincial,
        },
        {
          city_name: 'Ville de Bandundu',
          provincial: kwiluProvincial,
        },
        {
          city_name: 'Bagata',
          provincial: kwiluProvincial,
        },
        {
          city_name: 'Ville de Kikwit',
          provincial: kwiluProvincial,
        },
        {
          city_name: 'Bulungu',
          provincial: kwiluProvincial,
        },
        {
          city_name: 'Idiofa',
          provincial: kwiluProvincial,
        },
        {
          city_name: 'Mangai',
          provincial: kwiluProvincial,
        },
        {
          city_name: 'Dibaya – Lubwe',
          provincial: kwiluProvincial,
        },
        {
          city_name: 'Gungu',
          provincial: kwiluProvincial,
        },
        {
          city_name: 'Masi-Manimba',
          provincial: kwiluProvincial,
        },
        {
          city_name: 'Masi-Manimba',
          provincial: maiNdombeProvincial,
        },
        {
          city_name: 'Ville d’Inongo',
          provincial: maiNdombeProvincial,
        },
        {
          city_name: 'Inongo',
          provincial: maiNdombeProvincial,
        },
        {
          city_name: 'Kiri',
          provincial: maiNdombeProvincial,
        },
        {
          city_name: 'Oshwe',
          provincial: maiNdombeProvincial,
        },
        {
          city_name: 'Kutu',
          provincial: maiNdombeProvincial,
        },
        {
          city_name: 'Kwamouth',
          provincial: maiNdombeProvincial,
        },
        {
          city_name: 'Bolobo',
          provincial: maiNdombeProvincial,
        },
        {
          city_name: 'Yumbi',
          provincial: maiNdombeProvincial,
        },
        {
          city_name: 'Mushie',
          provincial: maiNdombeProvincial,
        },
        {
          city_name: 'Ville de Mbandaka',
          provincial: equateurProvincial,
        },
        {
          city_name: 'Bikoro',
          provincial: equateurProvincial,
        },
        {
          city_name: 'Lukolela',
          provincial: equateurProvincial,
        },
        {
          city_name: 'Bomongo',
          provincial: equateurProvincial,
        },
        {
          city_name: 'Basankusu',
          provincial: equateurProvincial,
        },
        {
          city_name: 'Bolomba',
          provincial: equateurProvincial,
        },
        {
          city_name: 'Ingende',
          provincial: equateurProvincial,
        },
        {
          city_name: 'Makanza',
          provincial: equateurProvincial,
        },
      
        // Province SUD-UBANGI
        {
          city_name: 'Ville de Gemena',
          provincial: sudUbangiProvincial,
        },
        {
          city_name: 'Gemena',
          provincial: sudUbangiProvincial,
        },
        {
          city_name: 'Budjala',
          provincial: sudUbangiProvincial,
        },
        {
          city_name: 'Kungu',
          provincial: sudUbangiProvincial,
        },
        {
          city_name: 'Libenge',
          provincial: sudUbangiProvincial,
        },
        {
          city_name: 'Ville de Zongo',
          provincial: sudUbangiProvincial,
        },
        {
          city_name: 'Ville de Gbadolite',
          provincial: nordUbangiProvincial,
        },
        {
          city_name: 'Mobayi-Mbongo',
          provincial: nordUbangiProvincial,
        },
        {
          city_name: 'Yakoma',
          provincial: nordUbangiProvincial,
        },
        {
          city_name: 'Businga',
          provincial: nordUbangiProvincial,
        },
        {
          city_name: 'Bosobolo',
          provincial: nordUbangiProvincial,
        },
        {
          city_name: 'Ville de Lisala',
          provincial: mongalaProvincial,
        },
        {
          city_name: 'Lisala',
          provincial: mongalaProvincial,
        },
        {
          city_name: 'Bumba',
          provincial: mongalaProvincial,
        },
        {
          city_name: 'Bongandanga',
          provincial: mongalaProvincial,
        },
        {
          city_name: 'Ville de Boende',
          provincial: tshuapaProvincial,
        },
        {
          city_name: 'Boende',
          provincial: tshuapaProvincial,
        },
        {
          city_name: 'Befale',
          provincial: tshuapaProvincial,
        },
        {
          city_name: 'Djolu',
          provincial: tshuapaProvincial,
        },
        {
          city_name: 'Ikela',
          provincial: tshuapaProvincial,
        },
        {
          city_name: 'Bokungu',
          provincial: tshuapaProvincial,
        },
        {
          city_name: 'Monkoto',
          provincial: tshuapaProvincial,
        },
      
        // Province TSHOPO
        {
          city_name: 'Ville de Kisangani',
          provincial: tshopoProvincial,
        },
        {
          city_name: 'Ubundu',
          provincial: tshopoProvincial,
        },
        {
          city_name: 'Opala',
          provincial: tshopoProvincial,
        },
        {
          city_name: 'Isangi',
          provincial: tshopoProvincial,
        },
        {
          city_name: 'Yangambi',
          provincial: tshopoProvincial,
        },
        {
          city_name: 'Yahuma',
          provincial: tshopoProvincial,
        },
        {
          city_name: 'Basoko',
          provincial: tshopoProvincial,
        },
        {
          city_name: 'Banalia',
          provincial: tshopoProvincial,
        },
        {
          city_name: 'Bafwasende',
          provincial: tshopoProvincial,
        },
        {
          city_name: 'Ville de Buta',
          provincial: basUeleProvincial,
        },
        {
          city_name: 'Buta',
          provincial: basUeleProvincial,
        },
        {
          city_name: 'Aketi',
          provincial: basUeleProvincial,
        },
        {
          city_name: 'Bondo',
          provincial: basUeleProvincial,
        },
        {
          city_name: 'Ango',
          provincial: basUeleProvincial,
        },
        {
          city_name: 'Poko',
          provincial: basUeleProvincial,
        },
        {
          city_name: 'Bambesa',
          provincial: basUeleProvincial,
        },
        {
          city_name: 'Dingila',
          provincial: basUeleProvincial,
        },
        {
          city_name: 'Ville d’Isiro',
          provincial: hautUeleProvincial,
        },
        {
          city_name: 'Rungu',
          provincial: hautUeleProvincial,
        },
        {
          city_name: 'Niangara',
          provincial: hautUeleProvincial,
        },
        {
          city_name: 'Dungu',
          provincial: hautUeleProvincial,
        },
        {
          city_name: 'Faradje',
          provincial: hautUeleProvincial,
        },
        {
          city_name: 'Watsa',
          provincial: hautUeleProvincial,
        },
        {
          city_name: 'Wamba',
          provincial: hautUeleProvincial,
        },
        {
          city_name: 'Ville de Bunia',
          provincial: ituriProvincial,
        },
        {
          city_name: 'Irumu',
          provincial: ituriProvincial,
        },
        {
          city_name: 'Mambasa',
          provincial: ituriProvincial,
        },
        {
          city_name: 'Mongwalu',
          provincial: ituriProvincial,
        },
        {
          city_name: 'Djugu',
          provincial: ituriProvincial,
        },
        {
          city_name: 'Mahagi',
          provincial: ituriProvincial,
        },
        {
          city_name: 'Aru',
          provincial: ituriProvincial,
        },
        {
          city_name: 'Ville de Goma',
          provincial: nordKivuProvincial,
        },
        {
          city_name: 'Nyirangongo',
          provincial: nordKivuProvincial,
        },
        {
          city_name: 'Masisi',
          provincial: nordKivuProvincial,
        },
        {
          city_name: 'Walikale',
          provincial: nordKivuProvincial,
        },
        {
          city_name: 'Lubero',
          provincial: nordKivuProvincial,
        },
        {
          city_name: 'Oicha',
          provincial: nordKivuProvincial,
        },
        {
          city_name: 'Ville de Beni',
          provincial: nordKivuProvincial,
        },
        {
          city_name: 'Ville de Butembo',
          provincial: nordKivuProvincial,
        },
        {
          city_name: 'Rutshuru',
          provincial: nordKivuProvincial,
        },
        {
          city_name: 'Ville de Bukavu',
          provincial: sudKivuProvincial,
        },
        {
          city_name: 'Kabare',
          provincial: sudKivuProvincial,
        },
        {
          city_name: 'Shabunda',
          provincial: sudKivuProvincial,
        },
        {
          city_name: 'Kalehe',
          provincial: sudKivuProvincial,
        },
        {
          city_name: 'Idjwi',
          provincial: sudKivuProvincial,
        },
        {
          city_name: 'Walungu',
          provincial: sudKivuProvincial,
        },
        {
          city_name: 'Uvira',
          provincial: sudKivuProvincial,
        },
        {
          city_name: 'Fizi',
          provincial: sudKivuProvincial,
        },
        {
          city_name: 'Baraka',
          provincial: sudKivuProvincial,
        },
        {
          city_name: 'Mwenga',
          provincial: sudKivuProvincial,
        },
        {
          city_name: 'Ville de Kindu',
          provincial: maniemaProvincial,
        },
        {
          city_name: 'Kailo',
          provincial: maniemaProvincial,
        },
        {
          city_name: 'Punia',
          provincial: maniemaProvincial,
        },
        {
          city_name: 'Lubutu',
          provincial: maniemaProvincial,
        },
        {
          city_name: 'Pangi',
          provincial: maniemaProvincial,
        },
        {
          city_name: 'Kabambare',
          provincial: maniemaProvincial,
        },
        {
          city_name: 'Kasongo',
          provincial: maniemaProvincial,
        },
        {
          city_name: 'Kibombo',
          provincial: maniemaProvincial,
        },
        {
          city_name: 'Ville de Lubumbashi',
          provincial: hautKatangaProvincial,
        },
        {
          city_name: 'Kipushi',
          provincial: hautKatangaProvincial,
        },
        {
          city_name: 'Sakania',
          provincial: hautKatangaProvincial,
        },
        {
          city_name: 'Kambove',
          provincial: hautKatangaProvincial,
        },
        {
          city_name: 'Ville de Likasi',
          provincial: hautKatangaProvincial,
        },
        {
          city_name: 'Kasenga',
          provincial: hautKatangaProvincial,
        },
        {
          city_name: 'Mitwaba',
          provincial: hautKatangaProvincial,
        },
        {
          city_name: 'Pweto',
          provincial: hautKatangaProvincial,
        },
        {
          city_name: 'Ville de Kolwezi',
          provincial: lualabaProvincial,
        },
        {
          city_name: 'Mutshatsha',
          provincial: lualabaProvincial,
        },
        {
          city_name: 'Lubudi',
          provincial: lualabaProvincial,
        },
        {
          city_name: 'Kasaji',
          provincial: lualabaProvincial,
        },
        {
          city_name: 'Dilolo',
          provincial: lualabaProvincial,
        },
        {
          city_name: 'Sandoa',
          provincial: lualabaProvincial,
        },
        {
          city_name: 'Ville de Kamina',
          provincial: hautLomamiProvincial,
        },
        {
          city_name: 'Kamina',
          provincial: hautLomamiProvincial,
        },
        {
          city_name: 'Kaniama',
          provincial: hautLomamiProvincial,
        },
        {
          city_name: 'Kabongo',
          provincial: hautLomamiProvincial,
        },
        {
          city_name: 'Malemba-Nkulu',
          provincial: hautLomamiProvincial,
        },
        {
          city_name: 'Bukama',
          provincial: hautLomamiProvincial,
        },
        {
          city_name: 'Ville de Kalemie',
          provincial: tanganyikaProvincial,
        },
        {
          city_name: 'Kalemie',
          provincial: tanganyikaProvincial,
        },
        {
          city_name: 'Moba',
          provincial: tanganyikaProvincial,
        },
        {
          city_name: 'Manono',
          provincial: tanganyikaProvincial,
        },
        {
          city_name: 'Kabalo',
          provincial: tanganyikaProvincial,
        },
        {
          city_name: 'Kongolo',
          provincial: tanganyikaProvincial,
        },
        {
          city_name: 'Nyunzu',
          provincial: tanganyikaProvincial,
        },
        {
          city_name: 'Ville de Mbuji-Mayi',
          provincial: kasaiOrientalProvincial,
        },
        {
          city_name: 'Tshilenge',
          provincial: kasaiOrientalProvincial,
        },
        {
          city_name: 'Miabi',
          provincial: kasaiOrientalProvincial,
        },
        {
          city_name: 'Kabeya-Kamuanga',
          provincial: kasaiOrientalProvincial,
        },
        {
          city_name: 'Lupatapata',
          provincial: kasaiOrientalProvincial,
        },
        {
          city_name: 'Katanda',
          provincial: kasaiOrientalProvincial,
        },
        {
          city_name: 'Ville de Lusambo',
          provincial: sankuruProvincial,
        },
        {
          city_name: 'Lusambo',
          provincial: sankuruProvincial,
        },
        {
          city_name: 'Kiana',
          provincial: sankuruProvincial,
        },
        {
          city_name: 'Bena-Dibele',
          provincial: sankuruProvincial,
        },
        {
          city_name: 'Pangi',
          provincial: sankuruProvincial,
        },
        {
          city_name: 'Ville de Kananga',
          provincial: kasaiProvincial,
        },
        {
          city_name: 'Kananga',
          provincial: kasaiProvincial,
        },
        {
          city_name: 'Tshimbulu',
          provincial: kasaiProvincial,
        },
        {
          city_name: 'Tshilundu',
          provincial: kasaiProvincial,
        },
        {
          city_name: 'Tshikapa',
          provincial: kasaiProvincial,
        },
        {
          city_name: 'Mweka',
          provincial: kasaiProvincial,
        },
        {
          city_name: 'Luebo',
          provincial: kasaiProvincial,
        },
        {
          city_name: 'Mikamba',
          provincial: kasaiProvincial,
        }
      ]);
      await cityRepository.save(citiesCreated);

      const kinshasaCity = await cityRepository.findOne({ where: { city_name: 'Kinshasa' } });
      const matadiCity = await cityRepository.findOne({ where: { city_name: 'Ville de Matadi' } });
      const bomaCity = await cityRepository.findOne({ where: { city_name: 'Ville de Boma' } });
      const moandaCity = await cityRepository.findOne({ where: { city_name: 'Moanda' } });
      const lukulaCity = await cityRepository.findOne({ where: { city_name: 'Lukula' } });
      const tshelaCity = await cityRepository.findOne({ where: { city_name: 'Tshela' } });
      const sekeBanzaCity = await cityRepository.findOne({ where: { city_name: 'Seke-Banza' } });
      const luoziCity = await cityRepository.findOne({ where: { city_name: 'Luozi' } });
      const songololoCity = await cityRepository.findOne({ where: { city_name: 'Songololo' } });
      const mbanzaNgunguCity = await cityRepository.findOne({ where: { city_name: 'Mbanza-Ngungu' } });
      const kasanguluCity = await cityRepository.findOne({ where: { city_name: 'Kasangulu' } });
      const madimbaCity = await cityRepository.findOne({ where: { city_name: 'Madimba' } });
      const kimvulaCity = await cityRepository.findOne({ where: { city_name: 'Kimvula' } });
      const kengeCity = await cityRepository.findOne({ where: { city_name: 'Ville de Kenge' } });
      const kenge2City = await cityRepository.findOne({ where: { city_name: 'Kenge' } });
      const feshiCity = await cityRepository.findOne({ where: { city_name: 'Feshi' } });
      const kahembaCity = await cityRepository.findOne({ where: { city_name: 'Kahemba' } });
      const kasongoLundaCity = await cityRepository.findOne({ where: { city_name: 'Kasongo Lunda' } });
      const popokabakaCity = await cityRepository.findOne({ where: { city_name: 'Popokabaka' } });
      const bandunduCity = await cityRepository.findOne({ where: { city_name: 'Ville de Bandundu' } });
      const bagataCity = await cityRepository.findOne({ where: { city_name: 'Bagata' } });
      const kikwitCity = await cityRepository.findOne({ where: { city_name: 'Ville de Kikwit' } });
      const bulunguCity = await cityRepository.findOne({ where: { city_name: 'Bulungu' } });
      const idiofaCity = await cityRepository.findOne({ where: { city_name: 'Idiofa' } });
      const mangaiCity = await cityRepository.findOne({ where: { city_name: 'Mangai' } });
      const dibayaLubweCity = await cityRepository.findOne({ where: { city_name: 'Dibaya – Lubwe' } });
      const gunguCity = await cityRepository.findOne({ where: { city_name: 'Gungu' } });
      const masiManimbaCity = await cityRepository.findOne({ where: { city_name: 'Masi-Manimba' } });
      const inongoCity = await cityRepository.findOne({ where: { city_name: 'Ville d’Inongo' } });
      const inongo2City = await cityRepository.findOne({ where: { city_name: 'Inongo' } });
      const kiriCity = await cityRepository.findOne({ where: { city_name: 'Kiri' } });
      const oshweCity = await cityRepository.findOne({ where: { city_name: 'Oshwe' } });
      const kutuCity = await cityRepository.findOne({ where: { city_name: 'Kutu' } });
      const kwamouthCity = await cityRepository.findOne({ where: { city_name: 'Kwamouth' } });
      const boloboCity = await cityRepository.findOne({ where: { city_name: 'Bolobo' } });
      const yumbiCity = await cityRepository.findOne({ where: { city_name: 'Yumbi' } });
      const mushieCity = await cityRepository.findOne({ where: { city_name: 'Mushie' } });
      const mbandakaCity = await cityRepository.findOne({ where: { city_name: 'Ville de Mbandaka' } });
      const bikoroCity = await cityRepository.findOne({ where: { city_name: 'Bikoro' } });
      const lukolelaCity = await cityRepository.findOne({ where: { city_name: 'Lukolela' } });
      const bomongoCity = await cityRepository.findOne({ where: { city_name: 'Bomongo' } });
      const makanzaCity = await cityRepository.findOne({ where: { city_name: 'Makanza' } });
      const basankusuCity = await cityRepository.findOne({ where: { city_name: 'Basankusu' } });
      const bolombaCity = await cityRepository.findOne({ where: { city_name: 'Bolomba' } });
      const ingendeCity = await cityRepository.findOne({ where: { city_name: 'Ingende' } });
      const gemenaCity = await cityRepository.findOne({ where: { city_name: 'Ville de Gemena' } });
      const gemena2City = await cityRepository.findOne({ where: { city_name: 'Gemena' } });
      const budjalaCity = await cityRepository.findOne({ where: { city_name: 'Budjala' } });
      const kunguCity = await cityRepository.findOne({ where: { city_name: 'Kungu' } });
      const libengeCity = await cityRepository.findOne({ where: { city_name: 'Libenge' } });
      const zongoCity = await cityRepository.findOne({ where: { city_name: 'Ville de Zongo' } });
      const gbadoliteCity = await cityRepository.findOne({ where: { city_name: 'Ville de Gbadolite' } });
            
      const townshipsCreated = townshipRepository.create([
        { township_name: 'Mont Ngafula', city: kinshasaCity },
        { township_name: 'Ngaliema', city: kinshasaCity },
        { township_name: 'Gombe', city: kinshasaCity },
        { township_name: 'Limete', city: kinshasaCity },
        { township_name: 'Masina', city: kinshasaCity },
        { township_name: 'Nsele', city: kinshasaCity },
        { township_name: 'Maluku', city: kinshasaCity },
        { township_name: 'Kimbanseke', city: kinshasaCity },
        { township_name: 'Ndjili', city: kinshasaCity },
        { township_name: 'Matete', city: kinshasaCity },
        { township_name: 'Kisenso', city: kinshasaCity },
        { township_name: 'Lemba', city: kinshasaCity },
        { township_name: 'Ngaba', city: kinshasaCity },
        { township_name: 'Makala', city: kinshasaCity },
        { township_name: 'Bumbu', city: kinshasaCity },
        { township_name: 'Selembao', city: kinshasaCity },
        { township_name: 'Kintambo', city: kinshasaCity },
        { township_name: 'Bandalunga', city: kinshasaCity },
        { township_name: 'Lingwala', city: kinshasaCity },
        { township_name: 'Kinshasa', city: kinshasaCity },
        { township_name: 'Barumbu', city: kinshasaCity },
        { township_name: 'Kalamu', city: kinshasaCity },
        { township_name: 'Ngiri - Ngiri', city: kinshasaCity },
        { township_name: 'Kasa -Vubu', city: kinshasaCity },
        { township_name: 'Matadi', city: matadiCity },
        { township_name: 'Nzaza', city: matadiCity },
        { township_name: "M'vuzi", city: matadiCity },
        { township_name: 'Kabondo', city: bomaCity },
        { township_name: 'Kalamu', city: bomaCity },
        { township_name: 'Nzadi', city: bomaCity },
        { township_name: 'Assolongo', city: moandaCity },
        { township_name: 'La Mer', city: moandaCity },
        { township_name: 'Boma – Bungu', city: moandaCity },
        { township_name: 'Mamputu', city: moandaCity },
        { township_name: 'Muanda', city: moandaCity },
        { township_name: 'Kakongo', city: lukulaCity },
        { township_name: 'Tsundi - Sud', city: lukulaCity },
        { township_name: 'Fubu', city: lukulaCity },
        { township_name: 'Tsanga - Sud', city: lukulaCity },
        { township_name: 'Patu', city: lukulaCity },
        { township_name: 'Lemba Kinsudi (com. rurale)', city: lukulaCity },
        { township_name: 'Nsioni(com. rurale)', city: lukulaCity },
        { township_name: 'Lukula', city: lukulaCity },
        { township_name: 'Nsioni', city: lukulaCity },
        { township_name: 'Tshela banga', city: tshelaCity },
        { township_name: 'Loango', city: tshelaCity },
        { township_name: 'Bula Naku', city: tshelaCity },
        { township_name: 'Nzobe - Luzi', city: tshelaCity },
        { township_name: 'Lubolo', city: tshelaCity },
        { township_name: 'Lubuzi', city: tshelaCity },
        { township_name: 'Nganda Sundi', city: tshelaCity },
        { township_name: 'Maduda', city: tshelaCity },
        { township_name: 'Kasa - Vubu', city: tshelaCity },
        { township_name: 'Luvu', city: tshelaCity },
        { township_name: 'Tshela', city: tshelaCity },
        { township_name: 'Seke-Banza (com. rurale)', city: sekeBanzaCity },
        { township_name: 'Bundi', city: sekeBanzaCity },
        { township_name: 'Mbavu', city: sekeBanzaCity },
        { township_name: 'Sumbi', city: sekeBanzaCity },
        { township_name: 'Isangila', city: sekeBanzaCity },
        { township_name: "Cité d'Inga(com. rurale)", city: sekeBanzaCity },
        { township_name: 'Lufu', city: sekeBanzaCity },
        { township_name: 'Kinzau - Mvuete (com. rurale)', city: sekeBanzaCity },
        { township_name: 'Luozi (com. rurale)', city: luoziCity },
        { township_name: 'Mbanza Ngoyo', city: luoziCity },
        { township_name: 'Mbanza Mona', city: luoziCity },
        { township_name: 'Mbanza Mwembe', city: luoziCity },
        { township_name: 'Kinkenge', city: luoziCity },
        { township_name: 'Mongo Luala', city: luoziCity },
        { township_name: 'Kimumba', city: luoziCity },
        { township_name: 'Kenge', city: luoziCity },
        { township_name: 'Balari', city: luoziCity },
        { township_name: 'Kivunda', city: luoziCity },
        { township_name: 'Kimbanza', city: luoziCity },
        { township_name: 'Songololo (com. rurale)', city: songololoCity },
        { township_name: 'Luima', city: songololoCity },
        { township_name: 'Palabala', city: songololoCity },
        { township_name: 'Bamboma', city: songololoCity },
        { township_name: 'Wombo', city: songololoCity },
        { township_name: 'Kimpese', city: songololoCity },
        { township_name: 'Vampa', city: songololoCity },
        { township_name: 'Lukala', city: songololoCity },
        { township_name: 'Boko', city: mbanzaNgunguCity },
        { township_name: 'Kivulu', city: mbanzaNgunguCity },
        { township_name: 'Sele (com. rurale)', city: mbanzaNgunguCity },
        { township_name: 'Gombe – Sud', city: mbanzaNgunguCity },
        { township_name: 'Kwilu - Ngongo', city: mbanzaNgunguCity },
        { township_name: 'Kwilu - Ngongo (com. rurale)', city: mbanzaNgunguCity },
        { township_name: 'Ntimansi', city: mbanzaNgunguCity },
        { township_name: 'Gombe - Matadi', city: mbanzaNgunguCity },
        { township_name: 'Lunzadi', city: mbanzaNgunguCity },
        { township_name: 'Commune de Ngungu', city: mbanzaNgunguCity },
        { township_name: 'Commune de Noki', city: mbanzaNgunguCity },
        { township_name: 'Kasangulu', city: kasanguluCity },
        { township_name: 'Lukunga - Mputu', city: kasanguluCity },
        { township_name: 'Luila', city: kasanguluCity },
        { township_name: 'Madimba (com. rurale)', city: madimbaCity },
        { township_name: 'Ngufu', city: madimbaCity },
        { township_name: 'Mfidi Malele', city: madimbaCity },
        { township_name: 'Wungu', city: madimbaCity },
        { township_name: 'Ngeba', city: madimbaCity },
        { township_name: 'Madimba', city: madimbaCity },
        { township_name: 'Mfuma - Kibambi', city: madimbaCity },
        { township_name: 'Luidi(Kinkosi)', city: madimbaCity },
        { township_name: 'Nkandu (com. rurale)', city: madimbaCity },
        { township_name: 'Kikonka (com. rurale)', city: madimbaCity },
        { township_name: 'Kimvula (com. rurale)', city: kimvulaCity },
        { township_name: 'Benga', city: kimvulaCity },
        { township_name: 'Luila - Lumene', city: kimvulaCity },
        { township_name: 'Lubisi', city: kimvulaCity },
        { township_name: 'Benga (com. rurale)', city: kimvulaCity },
        { township_name: 'Cinq Mai', city: kengeCity },
        { township_name: 'Laurent Désiré Kabila', city: kengeCity },
        { township_name: 'Manonga', city: kengeCity },
        { township_name: 'Masikita', city: kengeCity },
        { township_name: 'Mavula', city: kengeCity },
        { township_name: 'Kenge 2(com. rurale)', city: kenge2City },
        { township_name: 'chefferie Pelende – Nord', city: kenge2City },
        { township_name: 'Mosamba', city: kenge2City },
        { township_name: 'Dinga', city: kenge2City },
        { township_name: 'Bukanga – Lonzo', city: kenge2City },
        { township_name: 'Pont Kwango (com. rurale)', city: kenge2City },
        { township_name: 'Kolokoso', city: kenge2City },
        { township_name: 'Misele(com. rurale)', city: kenge2City },
        { township_name: 'Feshi (com. rurale)', city: feshiCity },
        { township_name: 'Ganaketi', city: feshiCity },
        { township_name: 'Feshi', city: feshiCity },
        { township_name: 'Lobo', city: feshiCity },
        { township_name: 'Mukoso', city: feshiCity },
        { township_name: 'Kwilu', city: kahembaCity },
        { township_name: 'Lutshima', city: kahembaCity },
        { township_name: 'Ntshakal', city: kahembaCity },
        { township_name: 'Kulindji', city: kahembaCity },
        { township_name: 'Tfundwale', city: kahembaCity },
        { township_name: 'Chefferie Mwendjila', city: kahembaCity },
        { township_name: 'Chefferie Muloshi', city: kahembaCity },
        { township_name: 'Bangu', city: kahembaCity },
        { township_name: 'Chefferie Mwa - Mushiko', city: kahembaCity },
        { township_name: 'Bindu', city: kahembaCity },
        { township_name: 'Imona', city: kasongoLundaCity },
        { township_name: 'Kituadi', city: kasongoLundaCity },
        { township_name: 'Kumbila', city: kasongoLundaCity },
        { township_name: 'Chefferie Kasongo-Lunda', city: kasongoLundaCity },
        { township_name: 'Kizamba', city: kasongoLundaCity },
        { township_name: 'Tembo (com. rurale)', city: kasongoLundaCity },
        { township_name: 'Swa Tenda', city: kasongoLundaCity },
        { township_name: 'Chefferie Kasa', city: kasongoLundaCity },
        { township_name: 'Kingulu', city: kasongoLundaCity },
        { township_name: 'Pelende (com. rurale)', city: kasongoLundaCity },
        { township_name: 'Mawanga', city: kasongoLundaCity },
        { township_name: 'Kibunda', city: kasongoLundaCity },
        { township_name: 'Panzi', city: kasongoLundaCity },
        { township_name: 'Kahungula (com. rurale)', city: kasongoLundaCity },
        { township_name: 'Kingwangala (com. rurale)', city: kasongoLundaCity },
        { township_name: 'Popokabaka (com. rurale)', city: popokabakaCity },
        { township_name: 'Popokabaka', city: popokabakaCity },
        { township_name: 'Yonso', city: popokabakaCity },
        { township_name: 'Lufuma', city: popokabakaCity },
        { township_name: 'Kabama(com. rurale)', city: popokabakaCity },
        { township_name: 'Kisoma(com. rurale)', city: popokabakaCity },
        { township_name: 'Disasi', city: bandunduCity },
        { township_name: 'Basoko', city: bandunduCity },
        { township_name: 'Mayoyo', city: bandunduCity },
        { township_name: 'Bagata (com. rurale)', city: bagataCity },
        { township_name: 'Manzasay', city: bagataCity },
        { township_name: 'Wamba - Fatundu', city: bagataCity },
        { township_name: 'Misay(commune rurale)', city: bagataCity },
        { township_name: 'Kwango - Kasay', city: bagataCity },
        { township_name: 'Kwilu - Ntobere', city: bagataCity },
        { township_name: 'Kidzueme', city: bagataCity },
        { township_name: 'Mabenga (com. rurale)', city: bagataCity },
        { township_name: 'Panu pay Pay (com. rurale)', city: bagataCity },
        { township_name: 'Kazamba', city: kikwitCity },
        { township_name: 'Nzinda', city: kikwitCity },
        { township_name: 'Lukolela', city: kikwitCity },
        { township_name: 'Lukemi', city: kikwitCity },
        { township_name: 'Luniungu', city: bulunguCity },
        { township_name: 'Kilunda', city: bulunguCity },
        { township_name: 'Mikwi', city: bulunguCity },
        { township_name: 'Djuma(com. rurale)', city: bulunguCity },
        { township_name: 'Kwilu - Kimbata', city: bulunguCity },
        { township_name: 'Dwe', city: bulunguCity },
        { township_name: 'Nyadi Nkara', city: bulunguCity },
        { township_name: 'Imbongo', city: bulunguCity },
        { township_name: 'Kipuka', city: bulunguCity },
        { township_name: 'Kwenge', city: bulunguCity },
        { township_name: 'Bukiombo - Lusanga(com. rurale)', city: bulunguCity },
        { township_name: 'Nko', city: bulunguCity },
        { township_name: 'Kabangu', city: bulunguCity },
        { township_name: 'Kwilu', city: bulunguCity },
        { township_name: 'Lukonzi', city: bulunguCity },
        { township_name: 'Musanga - Idiofa', city: idiofaCity },
        { township_name: 'Yasa - Lokwa', city: idiofaCity },
        { township_name: 'Kanga', city: idiofaCity },
        { township_name: 'Kalanganda', city: idiofaCity },
        { township_name: 'Bulwem', city: idiofaCity },
        { township_name: 'Sedzo', city: idiofaCity },
        { township_name: 'Piopio (com. rurale)', city: idiofaCity },
        { township_name: 'Mateko', city: idiofaCity },
        { township_name: 'Yolo/Eolo (com. rurale)', city: idiofaCity },
        { township_name: 'Kapia', city: idiofaCity },
        { township_name: 'Banga', city: idiofaCity },
        { township_name: 'Kipuku', city: idiofaCity },
        { township_name: 'Belo', city: idiofaCity },
        { township_name: 'Madimbi', city: idiofaCity },
        { township_name: 'Panu (com. rurale)', city: idiofaCity },
        { township_name: 'Kalo(com. rurale)', city: idiofaCity },
        { township_name: 'Mulasa(com. rurale)', city: idiofaCity },
        { township_name: 'Idiofa', city: idiofaCity },
        { township_name: 'Manding', city: idiofaCity },
        { township_name: 'Musanga', city: idiofaCity },
        { township_name: 'Isabo', city: mangaiCity },
        { township_name: 'Menki', city: mangaiCity },
        { township_name: 'Ipala', city: dibayaLubweCity },
        { township_name: 'Tshenza', city: dibayaLubweCity },
        { township_name: 'Ndambu', city: dibayaLubweCity },
        { township_name: 'Gungu', city: gunguCity },
        { township_name: 'Kandale', city: gunguCity },
        { township_name: 'Kobo', city: gunguCity },
        { township_name: 'Mudikalunga', city: gunguCity },
        { township_name: 'Kisunzu', city: gunguCity },
        { township_name: 'Mungindu', city: gunguCity },
        { township_name: 'Kilamba', city: gunguCity },
        { township_name: 'Lukamba', city: gunguCity },
        { township_name: 'Lozo', city: gunguCity },
        { township_name: 'Ngudi', city: gunguCity },
        { township_name: 'Mukedi(com. rurale)', city: gunguCity },
        { township_name: 'Kilembe', city: gunguCity },
        { township_name: 'Kondo', city: gunguCity },
        { township_name: 'Congo', city: gunguCity },
        { township_name: 'Kakobola', city: gunguCity },
        { township_name: 'Kwilu', city: gunguCity },
        { township_name: 'Lukwila', city: gunguCity },
        { township_name: 'Masi-Manimba', city: masiManimbaCity },
        { township_name: 'Kibolo', city: masiManimbaCity },
        { township_name: 'Kinzenzengo', city: masiManimbaCity },
        { township_name: 'Bindungi', city: masiManimbaCity },
        { township_name: 'Kinzenga', city: masiManimbaCity },
        { township_name: 'Masamuna(commune rurale)', city: masiManimbaCity },
        { township_name: 'Kitoy', city: masiManimbaCity },
        { township_name: 'Mokamo', city: masiManimbaCity },
        { township_name: 'Bwalayulu(com. rurale)', city: masiManimbaCity },
        { township_name: 'Mosango', city: masiManimbaCity },
        { township_name: 'Pay - Kongila', city: masiManimbaCity },
        { township_name: 'Pay - Kongila(com. rurale)', city: masiManimbaCity },
        { township_name: 'Sungu', city: masiManimbaCity },
        { township_name: 'Bibembo', city: masiManimbaCity },
        { township_name: 'Kangamiese', city: masiManimbaCity },
        { township_name: 'Lukuala', city: masiManimbaCity },
        { township_name: 'Bonse', city: inongoCity },
        { township_name: 'Mpolo', city: inongoCity },
        { township_name: 'Mpongonzoli', city: inongoCity },
        { township_name: 'Inongo', city: inongo2City },
        { township_name: 'Basengele', city: inongo2City },
        { township_name: 'Bolia', city: inongo2City },
        { township_name: "Tand'Embelo (commune rurale)", city: inongo2City },
        { township_name: 'Kiri(commune rurale)', city: kiriCity },
        { township_name: 'Lutoy', city: kiriCity },
        { township_name: 'Pendjwa', city: kiriCity },
        { township_name: 'Ikongo(commune rurale)', city: kiriCity },
        { township_name: 'Beronge', city: kiriCity },
        { township_name: 'Oshwe(commune rurale)', city: oshweCity },
        { township_name: 'Lukenie', city: oshweCity },
        { township_name: 'Entre Lukenie - Lokoro Nkaw', city: oshweCity },
        { township_name: 'Lokolama', city: oshweCity },
        { township_name: 'Kangara', city: oshweCity },
        { township_name: 'Commune rurale de Nioki', city: kutuCity },
        { township_name: 'Kutu(commune rurale)', city: kutuCity },
        { township_name: 'chefferie Badia', city: kutuCity },
        { township_name: 'Luabu', city: kutuCity },
        { township_name: 'chefferie Batere', city: kutuCity },
        { township_name: 'Mbien (commune rurale)', city: kutuCity },
        { township_name: 'Dungu (com. rurale)', city: kutuCity },
        { township_name: 'Kemba', city: kutuCity },
        { township_name: 'Semondane(commune rurale)', city: kutuCity },
        { township_name: 'Mfimi', city: kutuCity },
        { township_name: 'Semendua(commune rurale)', city: kutuCity },
        { township_name: 'Bokoro(commune rurale)', city: kutuCity },
        { township_name: 'Toolo(commune rurale)', city: kutuCity },
        { township_name: 'Kwamouth(commune rurale)', city: kwamouthCity },
        { township_name: 'Bateke - Sud/Twa', city: kwamouthCity },
        { township_name: 'chefferie Bateke - Nord', city: boloboCity },
        { township_name: 'Commune rurale de Bolobo', city: boloboCity },
        { township_name: 'Yumbi(commune rurale)', city: yumbiCity },
        { township_name: 'Mongama', city: yumbiCity },
        { township_name: 'Mushie(commune rurale)', city: mushieCity },
        { township_name: 'chefferie Baboma - Nord', city: mushieCity },
        { township_name: 'Commune de Wangata', city: mbandakaCity },
        { township_name: 'Commune de Mbandaka', city: mbandakaCity },
        { township_name: 'Bikoro(commune rurale)', city: bikoroCity },
        { township_name: 'Lac Ntomba', city: bikoroCity },
        { township_name: 'Elanga', city: bikoroCity },
        { township_name: 'Ekonda', city: bikoroCity },
        { township_name: 'Lukolela(commune rurale)', city: lukolelaCity },
        { township_name: 'Banunu', city: lukolelaCity },
        { township_name: 'Mpama', city: lukolelaCity },
        { township_name: 'Lusakani', city: lukolelaCity },
        { township_name: 'Bomongo(commune rurale)', city: bomongoCity },
        { township_name: 'Djamba', city: bomongoCity },
        { township_name: 'Ngiri', city: bomongoCity },
        { township_name: 'Makanza(commune rurale)', city: makanzaCity },
        { township_name: 'Ndobo', city: makanzaCity },
        { township_name: 'Bangala', city: makanzaCity },
        { township_name: 'Mweko(Moeko)', city: makanzaCity },
        { township_name: 'Commune de Baenga', city: basankusuCity },
        { township_name: 'Commune de Basankusu', city: basankusuCity },
        { township_name: 'Basankusu', city: basankusuCity },
        { township_name: 'Gombalo', city: basankusuCity },
        { township_name: 'Waka - Bokeka', city: basankusuCity },
        { township_name: 'Bolomba(commune rurale)', city: bolombaCity },
        { township_name: 'Chefferie Dianga', city: bolombaCity },
        { township_name: 'Mampoko', city: bolombaCity },
        { township_name: 'Bolomba', city: bolombaCity },
        { township_name: 'Lusanganya', city: bolombaCity },
        { township_name: 'Busira', city: bolombaCity },
        { township_name: 'Ingende(commune rurale)', city: ingendeCity },
        { township_name: 'Duali', city: ingendeCity },
        { township_name: 'Bokatola', city: ingendeCity },
        { township_name: 'Eungu', city: ingendeCity },
        { township_name: 'Mont Gila', city: gemenaCity },
        { township_name: 'Gbazubu', city: gemenaCity },
        { township_name: 'Labo', city: gemenaCity },
        { township_name: 'Lac - Ntumba', city: gemenaCity },
        { township_name: 'Banga - Kungu', city: gemena2City },
        { township_name: 'Bowase', city: gemena2City },
        { township_name: 'Mbari', city: gemena2City },
        { township_name: 'Nguya', city: gemena2City },
        { township_name: 'Budjala(commune rurale)', city: budjalaCity },
        { township_name: 'Ndolo - Liboko', city: budjalaCity },
        { township_name: 'Bolingo', city: budjalaCity },
        { township_name: 'Banza', city: budjalaCity },
        { township_name: 'Kungu(commune rurale)', city: kunguCity },
        { township_name: 'Mwanda', city: kunguCity },
        { township_name: 'Dongo', city: kunguCity },
        { township_name: 'Bamboma', city: kunguCity },
        { township_name: 'Songo', city: kunguCity },
        { township_name: 'Lwa', city: kunguCity },
        { township_name: 'Libenge(commune rurale)', city: libengeCity },
        { township_name: 'Libenge Sud', city: libengeCity },
        { township_name: 'Libenge Centre', city: libengeCity },
        { township_name: 'Libenge Nord', city: libengeCity },
        { township_name: 'Nzulu', city: zongoCity },
        { township_name: 'Wango', city: zongoCity },
        { township_name: 'Gbadolite', city: gbadoliteCity },
        { township_name: 'Molegbe', city: gbadoliteCity },
        { township_name: 'Nganza', city: gbadoliteCity },
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
        },
        {
          name_type_establishment: 0,
          description_type_establishment: "Hôtel 0 étoile",
        },
      ]);      

      await typeEstablishmentRepository.save(typeEstablishmentCreated);

      const typeRoomCreated = typeRoomRepository.create([
        {
          name_type_room: "Chambre simple",
          description_type_room: "Chambre simple pour tout le monde"
        },
        {
          name_type_room: "Chambre double standard",
          description_type_room: "Chambre double standard pour tout le monde"
        },
        {
          name_type_room: "Chambre double de luxe",
          description_type_room: "Chambre double de luxe pour tout le monde"
        },
        {
          name_type_room: "Chambre studio ou appartement",
          description_type_room: "Chambre studio ou appartement pour tout le monde"
        },
      ]);
      await typeRoomRepository.save(typeRoomCreated);

      // const roomSimple = await typeRoomRepository.findOne({ where: { name_type_room: 'Chambre simple'}});
      // const roomStandard = await typeRoomRepository.findOne({ where: { name_type_room: 'Chambre double standard'}});
      // const roomLuxe = await typeRoomRepository.findOne({ where: { name_type_room: '"Chambre double de luxe'}});

      // const zeroStart = await typeEstablishmentRepository.findOne({ where: { name_type_establishment: 0 }});
      // const oneStart = await typeEstablishmentRepository.findOne({ where: { name_type_establishment: 1 }});
      // const twoStart = await typeEstablishmentRepository.findOne({ where: { name_type_establishment: 2 }});
      // const threeStart = await typeEstablishmentRepository.findOne({ where: { name_type_establishment: 3 }});

      // const LingwalaTownship = await townshipRepository.findOne({ where: { township_name: "lingwala"}});
      // const gombeTownship =  await townshipRepository.findOne({ where: { township_name: "gombe" }});
      // const limeteTownship = await townshipRepository.findOne({ where: { township_name: "limete" }});
      // const tshelaTownship = await townshipRepository.findOne({ where: { township_name: "Tshela"} });
      // const gombeMatadiTownship = await townshipRepository.findOne({ where: { township_name: "Gombe - Matadi" }});
      // const kwengeTownship = await townshipRepository.findOne({ where: { township_name: "Kwenge" }});
      // const kwiluTownship = await townshipRepository.findOne({ where: { township_name: "Kwilu" }});

      // const townships = [
      //   LingwalaTownship,
      //   gombeTownship,
      //   limeteTownship,
      //   tshelaTownship,
      //   gombeMatadiTownship,
      //   kwengeTownship,
      //   kwiluTownship,
      // ];
      // const establishmentTypes = [
      //   zeroStart,
      //   oneStart,
      //   twoStart,
      //   threeStart,
      // ];
      // const roomTypes = [
      //   roomSimple,
      //   roomStandard,
      //   roomLuxe,
      // ];

      // for (const township of townships) {
      //   const townshipEntity = await townshipRepository.findOne({ where: { township_name: township.township_name } });
    
      //   for (const establishmentType of establishmentTypes) {
      //     const typeEstablishment = await typeEstablishmentRepository.findOne({ where: { name_type_establishment: establishmentType.name_type_establishment } });
    
      //     const user = new UserEntity();
      //     // const user = userRepository.create({
      //     user.lastname = `establishment${establishmentType.name_type_establishment}-${township.township_name}`;
      //     user.firstname =`establishment${establishmentType.name_type_establishment}-${township.township_name}`;
      //     user.wallet = 0;
      //     user.email = `establishment${establishmentType.name_type_establishment}-${township.township_name}@gmail.com`;
      //     user.password = await bcrypt.hash(`establishment${establishmentType.name_type_establishment}-${township.township_name}`, 10);
      //     // });
      //     console.log(user);
      //     await queryRunner.manager.save(UserEntity, user);
      //     const userRoleAdminCreated = userRoleRepository.create({
      //       user: user,
      //       role: adminRole,
      //     })
      //     await userRepository.save(userRoleAdminCreated);

      //     const rooms = [];
      //     for (const roomType of roomTypes) {
      //       const typeRoom = await typeRoomRepository.findOne({ where: { name_type_room: roomType.name_type_room } });
      //       const room = roomRepository.create({
      //         name_room: `${roomType.name_type_room} - ${township.township_name}`,
      //         price_per_night: Math.floor(Math.random() * 100) + 50,
      //         advantage: JSON.parse('["internet", "swimming pool"]'),
      //         pictures: JSON.parse('["picture1.jpg", "picture2.jpg", "picture3.jpg"]'),
      //         type_room: typeRoom,
      //       });
      //       rooms.push(room);
      //     }
      //     await roomRepository.save(rooms);
    
      //     const establishment = establishmentRepository.create({
      //       name_establishment: `Establishment ${establishmentType.name_type_establishment} - ${township.township_name}`,
      //       email: `example${establishmentType.name_type_establishment}-${township.township_name}@gmail.com`,
      //       township: townshipEntity,
      //       type_establishment: typeEstablishment,
      //       rooms: rooms,
      //       user: user,
      //     });
      //     await establishmentRepository.save(establishment);
      //   }
      // }
      await queryRunner.commitTransaction();
      return typeEstablishmentCreated;

      // const roomsCreated = roomRepository.create([
      //   {
      //     name_room: "Chambre 1-hb hotel",
      //     price_per_night: 30,
      //     advantage: JSON.parse('["internet", "swimming pool"]'),
      //     pictures: JSON.parse('["picture1.jpg", "picture2.jpg", "picture3.jpg]'),
      //     type_room: roomSimple,
      //   },
      // ]);
      // await roomRepository.save(roomsCreated);
      // const room1HbHotel = await roomRepository.findOne({ where: { name_room: "Chambre 1-hb hotel"}});

      // const usersCreated = userRepository.create([
      //   {
      //     lastname: "establishment1",
      //     firstname: "establishment1",
      //     wallet: 0,
      //     email: "establishment1@gmail.com",
      //     password: await bcrypt.hash("establishment1"),

      //   }
      // ]);
      // await userRepository.save(usersCreated);
      // const userEsta1 = await userRepository.findOne({ where: { email: "establishment1@gmail.com"}});


      // const establishmentCreated = establishmentRepository.create([
      //   {
      //     name_establishment: "Establishment 1",
      //     email: "example@gmail.com",
      //     township: LingwalaTownship,
      //     type_establishment: zeroStart,
      //     rooms: [
      //       room1HbHotel,
      //     ],
      //     user: userEsta1,
      //   },
      // ]);
      // await establishmentRepository.save(establishmentCreated);


    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error(error);
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
