import { Module } from '@nestjs/common';
import { EstablishmentService } from './establishment.service';
import { EstablishmentController } from './establishment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstablishmentEntity } from './entities/establishment.entity/establishment.entity';
import { TownshipEntity } from 'src/township/entities/township.entity/township.entity';
import { TypeEstablishmentEntity } from 'src/type_establishment/entities/type_establishment.entity/type_establishment.entity';
import { UserEntity } from 'src/user/entities/user.entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EstablishmentEntity, TownshipEntity, TypeEstablishmentEntity, UserEntity])],
  providers: [EstablishmentService],
  controllers: [EstablishmentController],
})
export class EstablishmentModule {}
