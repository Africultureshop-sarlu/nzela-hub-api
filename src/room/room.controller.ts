import { Controller, Get, Post, HttpStatus, Param, Res, UseGuards, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/jwt/auth.guard';
import { Response } from 'express';
import { RoomService } from './room.service';
import { AddRoomDto } from './dto/addRoom.dto';

@ApiTags('api/room')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('api/room')
export class RoomController {
    constructor(
        private readonly roomService: RoomService,
    ){}

    @Get("/:establishment_id")
    async getRoomsByEstablishment(
        @Param("establishment_id") establishment_id: string,
        @Res() res: Response
    ) : Promise<any>{
        try {
            const rooms = await this.roomService.getRoom(establishment_id);

            res.status(HttpStatus.OK).json({
                message: "Rooms received with successfull",
                data: rooms,
            })

        }catch (err){
            res.status(HttpStatus.NOT_FOUND).json({
                message: "Request failed, please try again",
                data: [],
                error: err
            })
        }
    }

    @Post("/:establishment_id")
    async createRoom(
        @Body() roomDto : AddRoomDto,
        @Param("establishment_id") establishment_id: string,
        @Res() res: Response
    ) : Promise<any>{
        try {
            const room = await this.roomService.addRoom(establishment_id, roomDto);

            res.status(HttpStatus.OK).json({
                message: "Rooms created with successfull",
                data: room,
            })

        }catch (err){
            res.status(HttpStatus.NOT_FOUND).json({
                message: "Request failed, please try again",
                data: [],
                error: err
            })
        }
    }
}
