import { BookingRoomEntity } from "src/booking_room/entities/booking_room.entity/booking_room.entity";
import { EstablishmentEntity } from "src/establishment/entities/establishment.entity/establishment.entity";
import { TypeRoomEntity } from "src/type_room/entities/type_room.entity/type_room.entity";
import { Column, Entity, Generated, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('rooms')
export class RoomEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Generated('uuid')
    @Column()
    uuid: string;

    @Column({ nullable: false })
    name_room: string;

    @Column({ nullable: false })
    description_room: string;

    @Column({ nullable: false })
    price_per_night: number;

    @Column({ nullable: false, type: 'json' })
    advantage: JSON;

    @Column({ nullable: false, type: 'json' })
    pictures: JSON;

    @ManyToOne(() => TypeRoomEntity, (typeroom) => typeroom.uuid)
    @JoinColumn({
        name: "type_room_id"
    })
    type_room: TypeRoomEntity;

    @ManyToOne(() => EstablishmentEntity, (establishment) => establishment.rooms)
    @JoinColumn({
        name: "establishment_id"
    })
    establishment: EstablishmentEntity;

    @OneToMany(() => BookingRoomEntity, (booking_room) => booking_room.room)
    booking_rooms: BookingRoomEntity[];
}
