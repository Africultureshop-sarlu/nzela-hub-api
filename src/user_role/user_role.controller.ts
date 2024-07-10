import { Body, Controller, Get, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { UserRoleService } from './user_role.service';
import { AuthGuard } from 'src/jwt/auth.guard';

@ApiTags('api/user-role')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('api/user-role')
export class UserRoleController {
    constructor(
        private readonly userRoleService: UserRoleService
    ){}

    @Get()
    async getUserRoles(
        @Res() res: Response, 
    ): Promise<any> {
        try {            
            const userRoles = await this.userRoleService.allUserRoles();

            return res.status(HttpStatus.OK).json({
                "message" : "User Role receveid with successfully",
                "data" : userRoles,
            });
        }catch(err){
            return res.status(HttpStatus.NOT_FOUND).json({
                "message" : "User Role are not receveid",
                "data" : [],
                "error" : err
            });
        }
    }
}
