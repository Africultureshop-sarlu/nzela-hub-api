import { Injectable, NotFoundException } from '@nestjs/common';
import { TypeRoomEntity } from './entities/type_room.entity/type_room.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { AddTypeRoomDto } from './dto/addTypeRoom.dto';

@Injectable()
export class TypeRoomService {
    constructor(
        @InjectRepository(TypeRoomEntity)
        private readonly typeRoomRepository: Repository<TypeRoomEntity>,
        
        private dataSource: DataSource,
    ){}

    async getTypeRooms(): Promise<TypeRoomEntity[]> {
        return await this.typeRoomRepository.find({
            order: {
                id : "DESC",
            }
        })
    }

    async createTypeRoom(typeRoomDto: AddTypeRoomDto) : Promise<TypeRoomEntity> {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {

            const typeRoom = await queryRunner.manager.save(TypeRoomEntity, typeRoomDto);
            await queryRunner.commitTransaction();

            return typeRoom;
            
        }  catch (error) {
            await queryRunner.rollbackTransaction();
            throw new NotFoundException("Request failed, please try again " + error);
        } finally {
            await queryRunner.release();
        }
    }
}
