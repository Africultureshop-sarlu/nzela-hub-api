import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { TypeEstablishmentService } from './type_establishment.service';
import { Response } from 'express';
import { AddTypeEstablishmentDto } from './dto/addTypeEstablishment.dto';

@Controller('type-establishment')
export class TypeEstablishmentController {
    constructor(
        private typeEstablishmentService: TypeEstablishmentService
    ){}

    @Get()
    async getTypeEstablishments(
        @Res() res: Response
    ): Promise<any> {
        try {
            const typeEstablishments = await this.typeEstablishmentService.getTypeEstablishments();

            return res.status(HttpStatus.OK).json({
                message: "Type Establishment has been get successfully",
                data: typeEstablishments,
            })
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "Request failed, please try again",
                error: error
            })         
        }
    }

    @Post()
    async createTypeEstablishment(
        @Body() AddTypeEstablishmentDto: AddTypeEstablishmentDto,
        @Res() res: Response
    ): Promise<any> {
        try {
            const typeEstablishmentCreated = await this.typeEstablishmentService.createTypeEstablishments(AddTypeEstablishmentDto);

            return res.status(HttpStatus.OK).json({
                message: "Type Establishment created successfully",
                data: typeEstablishmentCreated,
            })
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "Request failed, please try again",
                error: error
            })         
        }
    }
}