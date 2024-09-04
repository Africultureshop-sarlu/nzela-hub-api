import { Column, Generated, PrimaryGeneratedColumn } from 'typeorm';

export class Setting {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  @Column()
  uuid: string;

  @Column({ nullable: true, type: 'json' })
  payment_method: JSON;

  @Column({ nullable: true, type: 'json' })
  settings: JSON;
}
