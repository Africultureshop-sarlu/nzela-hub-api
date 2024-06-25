import { Module } from '@nestjs/common';
import { TypeEstablishmentController } from './type_establishment.controller';
import { TypeEstablishmentService } from './type_establishment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeEstablishmentEntity } from './entities/type_establishment.entity/type_establishment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TypeEstablishmentEntity])],
  controllers: [TypeEstablishmentController],
  providers: [TypeEstablishmentService],
})
export class TypeEstablishmentModule {}
