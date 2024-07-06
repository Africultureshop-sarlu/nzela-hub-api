import { TimestampEntites } from "src/generics/timestamp.entites";
import { RoomEntity } from "src/room/entities/room.entity/room.entity";
import { Column, Entity, Generated, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('type_rooms')
export class TypeRoomEntity extends TimestampEntites {

    @PrimaryGeneratedColumn()
    id: number;

    @Generated('uuid')
    @Column()
    uuid: string;

    @Column()
    name_type_room: string;

    @Column()
    description_type_room: string;

    @OneToMany(() => RoomEntity, (room) => room.uuid)
    @JoinColumn({ name: 'type_room_id' })
    rooms: RoomEntity[];
}
