import { BookingVehicleEntity } from "src/booking_vehicle/entities/booking_vehicle.entity/booking_vehicle.entity";
import { Column, Entity, Generated, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('vehicles')
export class VehicleEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Generated('uuid')
    @Column()
    uuid: string;

    @Column({ nullable: false })
    model: string;

    @Column({ nullable: true })
    make: string;

    @Column({ nullable: false })
    price_per_day: number;

    @Column({ nullable: false, default: true })
    availability: boolean;

    @Column({ nullable: false})
    color: string;

    @Column({ nullable: false, type: 'json' })
    pictures: JSON;

    @Column({ nullable: true })
    description: string;

    @OneToMany(() => BookingVehicleEntity, (booking_vehicle) => booking_vehicle.uuid)
    booking_vehicles: BookingVehicleEntity[];
}
