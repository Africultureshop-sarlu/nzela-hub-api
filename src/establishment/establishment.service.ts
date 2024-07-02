import { Injectable, NotFoundException } from '@nestjs/common';
import { EstablishmentEntity } from './entities/establishment.entity/establishment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AddEstablishmentDto } from './dto/addEstablishment.dto';
import { TownshipEntity } from 'src/township/entities/township.entity/township.entity';
import { TypeEstablishmentEntity } from 'src/type_establishment/entities/type_establishment.entity/type_establishment.entity';

@Injectable()
export class EstablishmentService {

    constructor(
        @InjectRepository(EstablishmentEntity)
        private establishmentRespository: Repository<EstablishmentEntity>,

        @InjectRepository(TownshipEntity)
        private townshipRespository: Repository<TownshipEntity>,

        @InjectRepository(TypeEstablishmentEntity)
        private typeEstablishmentRespository: Repository<TypeEstablishmentEntity>,

        // private dataSource: DataSource
    ){}

    async getEstablishments(): Promise<EstablishmentEntity[]> {
        return await this.establishmentRespository.find({
            order: {
                id: 'DESC',
            },
        });
    }

    async createEstablishments(
        addEstablishmentDto: AddEstablishmentDto
    ): Promise<any>{
        // const queryRunner = this.dataSource.createQueryBuilder();

        // await queryRunner.connect();
        // await queryRunner.startTransaction();

        try {
            const { 
                township_id, type_establishment_id, name_establishment, address, latitude, 
                longitude, zipcode, phone, email, applicable_tax, percentage_applicable_tax, pictures, settings,  
            } = addEstablishmentDto;

            const townshipFound : TownshipEntity = await this.townshipRespository.findOne({
                relations: {
                    provincial: true,
                },
                where: {
                    uuid: township_id,
                },
            });

            const typeEstablishmentFound : TypeEstablishmentEntity = await this.typeEstablishmentRespository.findOne({
                where: {
                    uuid: type_establishment_id,
                }
            });

            if(! typeEstablishmentFound || ! townshipFound){
                return null;
            }

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

            const establishmentCreated = await this.establishmentRespository.save(establishment);

            return establishmentCreated;
            
        } catch (error) {
            throw new NotFoundException("Reuest failed, please try again")
        }
    }
    
    async getEstablishment(id: number) : Promise<EstablishmentEntity>{
        return await this.establishmentRespository.findOne({
            where: {
                id: id,
            },
        });
    }
}
