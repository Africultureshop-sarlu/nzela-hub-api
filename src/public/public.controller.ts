/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Param,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { PublicService } from './public.service';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('api/public')
@Controller('api/public')
export class PublicController {
  constructor(private readonly publicService: PublicService) {}

  // @Post()
  // create(@Body() createPublicDto: CreatePublicDto) {
  //   return this.publicService.create(createPublicDto);
  // }

  @Get()
  async findAll(): Promise<any> {
    return await this.publicService.findAll();
  }

  @Get('/establishments')
  async findAllEstablishment(
    @Res() res: Response,
  ): Promise<any> {
    try {
      const {numberOfEstablishments, pages, establishments} = await this.publicService.findEstablishments();

      return res.status(HttpStatus.OK).json({
        message: 'Establishments received with successfully',
        data: {
          "establishments" : establishments,
          "numberOfEstablishments" : numberOfEstablishments,
          "totalPages" : pages
        },
      });
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'Establishments has not been received, please try again',
        data: [],
        error: error,
      });
    }   
  }

  @Get('establishment/:uuid')
  async findOne(
    @Param('uuid') uuid: string,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const establishments = await this.publicService.findOne(uuid);

      return res.status(HttpStatus.OK).json({
        message: 'Establishments recevied with successfully',
        data: establishments,
      });
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'Establishments has not been received, please try again',
        data: [],
        error: error,
      });
    }   
  }

  @Get('establishment/rooms/:id_establishment')
  async findRooms(
    @Param('id_establishment') uuid: string,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const rooms = await this.publicService.findRoomsByEstablishment(uuid);

      return res.status(HttpStatus.OK).json({
        message: 'Rooms received with successfully',
        data: rooms,
      });
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'Rooms has not been received, please try again',
        data: [],
        error: error,
      });
    }   
  }

  @Get('establishment/room/:id_room')
  async findOneRoom(
    @Param('id_room') uuid: string,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const room = await this.publicService.findOneRoomByEstablishment(uuid);

      return res.status(HttpStatus.OK).json({
        message: 'Room received with successfully',
        data: room,
      });
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'Room has not been received, please try again',
        data: [],
        error: error,
      });
    }   
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePublicDto: UpdatePublicDto) {
  //   return this.publicService.update(+id, updatePublicDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.publicService.remove(+id);
  // }
}
