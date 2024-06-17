import { BookingVehicleEntity } from "src/booking_vehicle/entities/booking_vehicle.entity/booking_vehicle.entity";
import { TimestampEntites } from "src/generics/timestamp.entites";
import { Column, Entity, Generated, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("payment_vehicles")
export class PaymentVehicleEntity extends TimestampEntites {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Generated('uuid')
    uuid: string;

    @Column({ nullable: false })
    amount: string;

    @Column({ nullable: false })
    payment_method: string;

    @Column({ nullable: false })
    status: string;

    @Column({ nullable: false, default: false })
    using_wallet: boolean;

    @ManyToOne(() => BookingVehicleEntity, (booking_vehicle) => booking_vehicle.uuid)
    @JoinColumn({
        name: 'booking_vehicle_id',
    })
    booking_vehicle: BookingVehicleEntity;
}
