import { Body, Controller, Get, HttpStatus, NotFoundException, Post, Res, UseGuards } from '@nestjs/common';
import { TownshipService } from './township.service';
import { Response } from 'express';
import { addTownshipDto } from './dto/addTownship.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/jwt/auth.guard';

@ApiTags('township')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('township')
export class TownshipController {
    constructor(
        private townshipService: TownshipService
    ){}

    @Get()
    async getTownships(
        @Res() res: Response
    ): Promise<any>{
        try {
            const townships =  await this.townshipService.getTownships();
            return res.status(HttpStatus.OK).json({
                message : "Townships retrieved successfully",
                data: townships,
            });
        } catch (error) {
            throw new NotFoundException('Request failed, please try again')
        }
    }

    @Post()
    async createTownship(
        @Body() addTownshipDto: addTownshipDto,
        @Res() res : Response
    ){
        try {
            const townshipCreated = await this.townshipService.createTownship(addTownshipDto);

            if( ! townshipCreated){
                return res.status(HttpStatus.NOT_FOUND).json({
                    message: `The provincial with ID ${addTownshipDto.provincial_id} already exists`,
                    data: [],
                })
            }
            return res.status(HttpStatus.OK).json({
                message: "Township created successfully",
                data: townshipCreated,
            })
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: "Request failed, please try again",
                data: [],
                error: error
            })
        }
    }
}
