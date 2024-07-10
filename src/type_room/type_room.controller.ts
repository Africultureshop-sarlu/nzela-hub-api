import { Body, Controller, Get, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/jwt/auth.guard';
import { Response } from 'express';
import { TypeRoomService } from './type_room.service';
import { AddTypeRoomDto } from './dto/addTypeRoom.dto';

@ApiTags('api/type-room')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('api/type-room')
export class TypeRoomController {
    constructor(
        private typeRoomService: TypeRoomService,
    ){}

    @Get()
    async getTypeRoom(
        @Res() res: Response,
    ) : Promise<any> {
        try {
            const typeRooms = await this.typeRoomService.getTypeRooms();
            return res.status(HttpStatus.OK).json({
                message: "Type Room receveid with successfully",
                data: typeRooms,
            })
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "Request failed, please try again",
                error: error
            }) 
        }
    }

    @Post()
    async createTypeRoom(
        @Body() typeRoomDto: AddTypeRoomDto,
        @Res() res: Response,
    ){
        try {
            const typeRoom = await this.typeRoomService.createTypeRoom(typeRoomDto);

            return res.status(HttpStatus.OK).json({
                message: "Type Room created with successfully",
                data: typeRoom,
            })
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "Request failed, please try again",
                error: error
            }) 
        }
    }
}
