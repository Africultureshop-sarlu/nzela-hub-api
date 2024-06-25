import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TypeEstablishmentEntity } from './entities/type_establishment.entity/type_establishment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AddTypeEstablishmentDto } from './dto/addTypeEstablishment.dto';

@Injectable()
export class TypeEstablishmentService {

    constructor(
        @InjectRepository(TypeEstablishmentEntity)
        private readonly typeEstablishmentRepository: Repository<TypeEstablishmentEntity>,


    ){}

        async getTypeEstablishments(): Promise<TypeEstablishmentEntity[]>{
            return await this.typeEstablishmentRepository.find({
                order: {
                    id: "DESC"
                }
            })
        }

        async createTypeEstablishments(AddTypeEstablishmentDto: AddTypeEstablishmentDto): Promise<TypeEstablishmentEntity>{
            try {
                const typeEstablishmentCreated = await this.typeEstablishmentRepository.save(AddTypeEstablishmentDto);
                return typeEstablishmentCreated;
            } catch (error) {
                throw new NotFoundException("Request failed, please try again")
            }
        }
}
