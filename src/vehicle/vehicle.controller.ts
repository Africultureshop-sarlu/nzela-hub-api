import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/jwt/auth.guard';

@ApiTags('api/vehicle')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('api/vehicle')
export class VehicleController {

    @Get()
    async getVehicle(): Promise<any>{
        return {
            "message": "Vehicle",
            "data": []
        }
    }
}
