import { BadRequestException, Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { EstablishmentService } from './establishment.service';
import { Response } from 'express';

@Controller('establishments')
export class EstablishmentController {
    constructor(
        private readonly establishmentService: EstablishmentService
    ){}

    @Get()
    async establishments(
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
}
