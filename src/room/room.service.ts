import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { RoomEntity } from './entities/room.entity/room.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AddRoomDto } from './dto/addRoom.dto';
import { TypeRoomEntity } from 'src/type_room/entities/type_room.entity/type_room.entity';
import { EstablishmentEntity } from 'src/establishment/entities/establishment.entity/establishment.entity';

@Injectable()
export class RoomService {

    constructor(
        @InjectRepository(RoomEntity)
        private roomRepository: Repository<RoomEntity>,

        private dataSource: DataSource,
    ){}

    async getRoom(establishment_id: string): Promise<RoomEntity[]> {
        return this.roomRepository.find({
            order: {
                id: "DESC"
            },
            // relations: {
            //     establishment: true,
            // },
            where: {
                establishment:{
                    uuid: establishment_id,
                },
            }
        })
    }

    async addRoom(establishment_id: string, roomDto: AddRoomDto) : Promise<any> {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const  { name_room, description_room, price_per_night, type_room_id, advantage, pictures } = roomDto;

            const typeRoom = await queryRunner.manager.findOne(TypeRoomEntity, {
                where: {
                    uuid: type_room_id,
                }
            })

            const establishment = await queryRunner.manager.findOne(EstablishmentEntity, {
                where: {
                    uuid: establishment_id,
                }
            })

            if(! typeRoom || ! establishment){
                await queryRunner.rollbackTransaction();
                throw new NotFoundException(`The type of room with id ${type_room_id} or ${establishment_id} is not found`);
            }

            const room = new RoomEntity();

            room.name_room = name_room;
            room.description_room = description_room;
            room.price_per_night = price_per_night;
            room.advantage = advantage;
            room.pictures = pictures;
            room.type_room = typeRoom;
            room.establishment = establishment;

            const roomCreated = queryRunner.manager.save(RoomEntity, room);
            
            await queryRunner.commitTransaction();

            return roomCreated;

        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw new NotFoundException(`Request failed: ${error.message}`);
        } finally {
            await queryRunner.release();
        }
    }
}


