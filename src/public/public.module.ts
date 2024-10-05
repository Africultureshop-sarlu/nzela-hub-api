/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PublicService } from './public.service';
import { PublicController } from './public.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstablishmentEntity } from 'src/establishment/entities/establishment.entity/establishment.entity';
import { CountryEntity } from 'src/country/entities/country.entity/country.entity';
import { ProvincialEntity } from 'src/provincial/entities/provincial.entity/provincial.entity';
import { TownshipEntity } from 'src/township/entities/township.entity/township.entity';
import { UserEntity } from 'src/user/entities/user.entity/user.entity';
import { RoleEntity } from 'src/role/entities/role.entity/role.entity';
import { UserRoleEntity } from 'src/user_role/entities/user_role.entity/user_role.entity';
import { TypeRoomEntity } from 'src/type_room/entities/type_room.entity/type_room.entity';
import { RoomEntity } from 'src/room/entities/room.entity/room.entity';
import { TypeEstablishmentEntity } from 'src/type_establishment/entities/type_establishment.entity/type_establishment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EstablishmentEntity,
      CountryEntity,
      ProvincialEntity,
      TownshipEntity,
      UserEntity,
      RoleEntity,
      UserRoleEntity,
      TypeRoomEntity,
      RoomEntity,
      TypeEstablishmentEntity,
      
    ]),
  ],
  controllers: [PublicController],
  providers: [PublicService],
})
export class PublicModule {}
