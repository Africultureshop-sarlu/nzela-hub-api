import {
  Controller,
  Post,
  Res,
  Req,
  Body,
  UseGuards,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/jwt/auth.guard';
import { Response, Request } from 'express';
import { BookingRoomService } from './booking_room.service';
import { AddBookingRoomDto } from './dto/add-booking-room.dto';

@ApiTags('api/booking-room')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('api/booking-room')
export class BookingRoomController {
  constructor(private bookingRoomService: BookingRoomService) {}

  @Post()
  async createTypeEstablishment(
    @Body() addBookingRoomDto: AddBookingRoomDto,
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<any> {
    try {
      const user = req['user'];
      const booking_room = await this.bookingRoomService.createBookingRoom(
        addBookingRoomDto,
        user,
      );

      return res.status(HttpStatus.OK).json({
        message: 'Reservation was created successfully',
        data: booking_room,
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Request failed, please try again',
        error: error,
      });
    }
  }

  @Get()
  async getBookings(@Res() res: Response, @Req() req: Request): Promise<any> {
    try {
      const user = req['user'];
      const bookingRooms =
        await this.bookingRoomService.getAllBookingRooms(user);

      return res.status(HttpStatus.OK).json({
        message: 'Reservation received with successfully',
        data: bookingRooms,
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Request failed, please try again',
        error: error,
      });
    }
  }
}
