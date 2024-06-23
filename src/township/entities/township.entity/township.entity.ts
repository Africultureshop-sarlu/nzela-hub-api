import { TimestampEntites } from "src/generics/timestamp.entites";
import { ProvincialEntity } from "src/provincial/entities/provincial.entity/provincial.entity";
import { Column, Entity, Generated, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('townships')
export class TownshipEntity extends TimestampEntites {

    @PrimaryGeneratedColumn()
    id: number;

    @Generated('uuid')
    @Column()
    uuid: string;

    @Column({ nullable: false })
    township_name: string;

    @Column({ nullable: false })
    description_township: string;

    @ManyToOne(() => ProvincialEntity, (provincial) => provincial.townships, { nullable: false })
    @JoinColumn({ name: 'provincial_id' , referencedColumnName: 'id'})
    provincial: ProvincialEntity;
}
