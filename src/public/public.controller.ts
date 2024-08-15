/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Param,
  Res,
  HttpStatus,
  Post,
  Body,
} from '@nestjs/common';
import { PublicService } from './public.service';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { roomsFilterDto } from './dto/rooms-filter.dto';

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

  @Get('/provincial')
  async findAllProvincial(
    @Res() res: Response,
  ): Promise<any> {
    try {
      const provincials = await this.publicService.findProvincials();

      return res.status(HttpStatus.OK).json({
        message: 'Provincials received with successfully',
        data: provincials,
      });
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'Provincials are not been received, please try again',
        data: [],
        error: error.message,
      });
    }   
  }

  @Get('/provincial/:uuid')
  async findProvincial(
    @Res() res: Response,
    @Param('uuid') uuid: string,
  ): Promise<any> {
    try {
      const provincial = await this.publicService.findProvincial(uuid);

      return res.status(HttpStatus.OK).json({
        message: 'Provincial received with successfully',
        data: provincial,
      });
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'Provincial has not been received, please try again',
        data: [],
        error: error.message,
      });
    }   
  }

  @Get('/provincial/name/:name_provincial')
  async findProvincialByName(
    @Res() res: Response,
    @Param('name_provincial') name_provincial: string,
  ): Promise<any> {
    try {
      const provincial = await this.publicService.findProvincialByName(name_provincial);

      return res.status(HttpStatus.OK).json({
        message: 'Provincial received with successfully',
        data: provincial,
      });
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'Provincial has not been received, please try again',
        data: [],
        error: error.message,
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

  @Post('/rooms/filter')
  async findRoomsFilter(
    @Body() filter: roomsFilterDto,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const rooms = await this.publicService.findRoomsByFilter(filter);

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


  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePublicDto: UpdatePublicDto) {
  //   return this.publicService.update(+id, updatePublicDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.publicService.remove(+id);
  // }
}
