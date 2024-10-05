import { TimestampEntites } from 'src/generics/timestamp.entites';
import { UserEntity } from 'src/user/entities/user.entity/user.entity';
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('comments')
export class CommentEntity extends TimestampEntites {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uuid: string;

  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'int' })
  start: number;

  @ManyToOne(() => UserEntity, (user) => user.uuid)
  @JoinColumn({
    name: 'user_id',
  })
  user: UserEntity;
}
