import { BadRequestException, Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { EstablishmentService } from './establishment.service';
import { Response } from 'express';
import { AddEstablishmentDto } from './dto/addEstablishment.dto';

@Controller('establishments')
export class EstablishmentController {
    constructor(
        private readonly establishmentService: EstablishmentService
    ){}

    @Get()
    async getEstablishments(
        @Res() res: Response, 
    ): Promise<any> {
        try {            
            const establishments = await this.establishmentService.getEstablishments();

            return res.status(HttpStatus.OK).json({
                "message" : "Establishments receveid with successfully",
                "data" : establishments,
            });

        }catch(err){
            new BadRequestException('Request failed, please try again');
        }
    }

    @Post()
    async createEstablishments(
        @Body() addEstablishmentDto: AddEstablishmentDto,
        @Res() res : Response
    ): Promise<any> {
        try {
            
            const establishment = await this.establishmentService.createEstablishments(addEstablishmentDto);

            return res.status(HttpStatus.OK).json({
                "message" : "Establishments created with successfully",
                "data" : establishment,
            });

        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).json({
                "message" : "Establishments has not been created",
                "data" : [],
                "error" : error,
            });
        }
    }
}
