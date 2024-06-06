import { BadRequestException, Body, Controller, Get, HttpStatus, Post, Res, ValidationPipe } from '@nestjs/common';
import { RoleService } from './role.service';
import { Response } from 'express';
import { AddRoleDto } from './dto/addRole.dto';

@Controller('role')
export class RoleController {
    constructor( private readonly roleService: RoleService){}

    @Get()
    async getAllRole(
        @Res() res: Response, 
    ): Promise<any> {
        try {
            const role = await this.roleService.getRoles();

            res.status(HttpStatus.OK).json({
                "message" : "Role receveid with successfully",
                "data" : role,
            });
        } catch (error) {
            new BadRequestException();
        }
    }

    @Post()
    async createRole(
        @Body() roleDto: AddRoleDto,
        @Res() res: Response, 
    ) : Promise<any> {
        
        try {
            const role = await this.roleService.createRole(roleDto);

            if(role){
                res.status(HttpStatus.CREATED).json({
                    "message" : "Role created with successfully",
                    "data" : role,
                });
            }
        } catch {
            res.status(HttpStatus.NOT_FOUND).json({
                "message" : "Role are not created",
                "data" : [],
            });
        }
        
    }
}
