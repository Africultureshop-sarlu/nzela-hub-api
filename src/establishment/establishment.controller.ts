/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { EstablishmentService } from './establishment.service';
import { Request, Response } from 'express';
import { AddEstablishmentDto } from './dto/addEstablishment.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/jwt/auth.guard';
import { AddRoomDto } from 'src/room/dto/addRoom.dto';

@ApiTags('api/establishments')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('api/establishments')
export class EstablishmentController {
  constructor(private readonly establishmentService: EstablishmentService) {}

  @Get()
  async getEstablishments(
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<any> {
    try {
      const user = req['user'];

      const establishments =
        await this.establishmentService.getEstablishments();

      return res.status(HttpStatus.OK).json({
        message: 'Establishments receveid with successfully',
        data: establishments,
      });
    } catch (err) {
      new BadRequestException('Request failed, please try again');
    }
  }

  @Get(':id')
  async getEstablishment(
    @Res() res: Response,
    @Req() req: Request,
    @Param('id') id: string,
  ): Promise<any> {
    try {
      const user = req['user'];

      const establishment =
        await this.establishmentService.getEstablishment(id);

      return res.status(HttpStatus.OK).json({
        message: 'Establishment receveid with successfully',
        data: establishment,
      });
    } catch (err) {
      new BadRequestException('Request failed, please try again');
    }
  }

  @Post()
  async createEstablishments(
    @Body() addEstablishmentDto: AddEstablishmentDto,
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<any> {
    try {
      const establishment =
        await this.establishmentService.createEstablishments(
          addEstablishmentDto,
        );

      return res.status(HttpStatus.OK).json({
        message: 'Establishments created with successfully',
        data: establishment,
      });
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'Establishments has not been created',
        data: [],
        error: error,
      });
    }
  }

  @Post('/room')
  async createRoom(
    @Body() roomDto: AddRoomDto,
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<any> {
    try {
        const rooms: any = await this.establishmentService.createRooms(roomDto, req);
        
        res.status(HttpStatus.OK).json({
            message: "Rooms created with successfull",
            data: rooms,
        })
        
    } catch (error) {
        res.status(HttpStatus.NOT_FOUND).json({
            message: "Request failed, please try again",
            data: [],
            error: error
        })        
    }
  }
}
