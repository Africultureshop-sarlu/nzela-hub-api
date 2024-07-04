import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ProvincialService } from './provincial.service';
import { AddProvinceDto } from './dto/addProvincial.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/jwt/auth.guard';

@ApiTags('provincial')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('provincial')
export class ProvincialController {
    constructor(private readonly provincialService: ProvincialService){}

    @Get()
    async getProvincials(
        @Res() res : Response
    ) : Promise<any> {
        try {
            const provincials = await this.provincialService.getProvincials();

            return res.status(HttpStatus.OK).json({
                message : "Provincials retrieved successfully",
                data: provincials,
            });
        } catch (error) {
            new BadRequestException("Request failed, please try again")
        }
    }


    @Post()
    async createProvincial(
        @Body() body: AddProvinceDto,
        @Res() res: Response
    ): Promise<any> {
        try {
            const provincialCreated = await this.provincialService.createProvincial(body);

            if (provincialCreated === null ){
                return res.status(HttpStatus.NOT_FOUND).json({
                    "message" : `Country with id ${body.country_id} not found`,
                    "data" : [],
                });
            }else{
                return res.status(HttpStatus.CREATED).json({
                    "message" : "Provincial created with successfully",
                    "data" : provincialCreated,
                });
            }
        } catch (error) {
            new BadRequestException("Request failed, please try again")
        }
    }
}
