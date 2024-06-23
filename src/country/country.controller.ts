import { BadRequestException, Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CountryService } from './country.service';
import { AddCountryDto } from './dto/addCountry.dto';

@Controller('country')
export class CountryController {
    constructor( private readonly countryService: CountryService){}

    @Get()
    async getContries(
        @Res() res : Response
    ): Promise<any> {
        try {
            const countries = await this.countryService.getCountries();

            return res.status(HttpStatus.OK).json({
                "message" : "Countries receveid with successfully",
                "data" : countries,
            });

        } catch (error) {
            new BadRequestException();            
        }
    }

    @Get(":id")
    async getContry(
        @Param("id") id: string,
        @Res() res: Response
    ): Promise<any>{
        try {
            const country = await this.countryService.getCountry(id);
            
            return res.status(HttpStatus.OK).json({
                "message" : "Country receveid with successfully",
                "data" : country,
            });
        } catch (error) {
            new BadRequestException("Request failed, please try again")
        }
    }

    @Post()
    async createCountry(
        @Body() country: AddCountryDto,
        @Res() res: Response
    ){
        try {
            const countryCreated = await this.countryService.createCountry(country);

            if (countryCreated){
                return res.status(HttpStatus.CREATED).json({
                    "message" : "Country created with successfully",
                    "data" : countryCreated,
                });
            }
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).json({
                "message" : "Country are not created",
                "data" : [],
            });
        }
    }
}
