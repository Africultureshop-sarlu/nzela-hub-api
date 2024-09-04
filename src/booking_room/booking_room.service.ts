import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingRoomEntity } from './entities/booking_room.entity/booking_room.entity';
import { DataSource, Repository } from 'typeorm';
import { AddBookingRoomDto } from './dto/add-booking-room.dto';
import { RoomEntity } from 'src/room/entities/room.entity/room.entity';
import { PaymentRoomEntity } from 'src/payment_room/entities/payment_room.entity/payment_room.entity';
import { UserEntity } from 'src/user/entities/user.entity/user.entity';

@Injectable()
export class BookingRoomService {
  constructor(
    @InjectRepository(BookingRoomEntity)
    private readonly bookingroomRepository: Repository<BookingRoomEntity>,

    @InjectRepository(RoomEntity)
    private readonly roomRepository: Repository<RoomEntity>,

    @InjectRepository(PaymentRoomEntity)
    private readonly paymentRoomRepository: Repository<PaymentRoomEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    private readonly dataSource: DataSource,
  ) {}

  async createBookingRoom(
    addBookingRoomDto: AddBookingRoomDto,
    user: any,
  ): Promise<BookingRoomEntity> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { room_id } = addBookingRoomDto;

      const room = await this.roomRepository.findOne({
        where: {
          uuid: room_id,
        },
      });

      if (!room) {
        throw new NotFoundException('This room does not exist');
      }

      const start_date: any = new Date(addBookingRoomDto.start_date);
      const end_date: any = new Date(addBookingRoomDto.end_date);

      // Calculer la différence en millisecondes
      const difference_in_time: number = start_date - end_date;
      const number_days = (difference_in_time / (1000 * 60 * 60 * 24)) * -1;

      const total_price: number = room.price_per_night * number_days;

      const userFind = await this.userRepository.findOne({
        where: {
          uuid: user.uuid,
        },
      });

      const bookingRoom = new BookingRoomEntity();

      bookingRoom.total_price = total_price;
      bookingRoom.room = room;
      bookingRoom.start_date = start_date;
      bookingRoom.end_date = end_date;
      bookingRoom.status = 'success';
      bookingRoom.user = userFind;

      const bookingRoomCreated = queryRunner.manager.save(
        BookingRoomEntity,
        bookingRoom,
      );

      const paymentRoom = new PaymentRoomEntity();

      paymentRoom.amount = total_price + '';
      paymentRoom.using_wallet = false;
      paymentRoom.status = 'reserved';
      paymentRoom.payment_method = 'mobile';
      paymentRoom.booking_room = await bookingRoomCreated;

      queryRunner.manager.save(PaymentRoomEntity, paymentRoom);
      await queryRunner.commitTransaction();

      return bookingRoomCreated;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new NotFoundException('Request failed, please try again');
    }
  }

  async getAllBookingRooms(user: any): Promise<BookingRoomEntity[] | any> {
    try {
      const userFind = await this.userRepository.findOne({
        where: {
          uuid: user.uuid,
        },
      });

      const bookings = await this.bookingroomRepository.find({
        relations: {
          payment_rooms: true,
          room: true,
          user: true,
        },
        where: {
          user: {
            id: userFind.id,
          },
        },
      });

      return bookings;
    } catch (error) {
      throw new NotFoundException('Request failed, please try again');
    }
  }
}
