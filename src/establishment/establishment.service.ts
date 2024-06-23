import { Injectable } from '@nestjs/common';
import { EstablishmentEntity } from './entities/establishment.entity/establishment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EstablishmentService {

    constructor(
        @InjectRepository(EstablishmentEntity)
        private establishmentRespository: Repository<EstablishmentEntity>
    ){}

    async getEstablishments(): Promise<EstablishmentEntity[]> {
        return await this.establishmentRespository.find({
            order: {
                id: 'DESC',
            },
        });
    }

    
}
