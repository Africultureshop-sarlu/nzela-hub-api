import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, ParseIntPipe, Patch, Post, Put, Query, Res, ServiceUnavailableException, ValidationPipe } from '@nestjs/common';
import { RoleService } from './role.service';
import { Response } from 'express';
import { AddRoleDto } from './dto/addRole.dto';
import { UpdateRoleDto } from './dto/updateRole.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('role')
@Controller('role')
export class RoleController {
    constructor( private readonly roleService: RoleService){}

    @Get()
    async getAllRole(
        @Res() res: Response, 
    ): Promise<any> {
        try {
            const roles = await this.roleService.getRoles();

            return res.status(HttpStatus.OK).json({
                "message" : "Role receveid with successfully",
                "data" : roles,
            });
        } catch (error) {
            new BadRequestException();
        }
    }

    @Get(":id")
    async getRoleById(
        @Res() res: Response,
        @Param("id", ParseIntPipe) id: number
    ): Promise<any>{
        try {            
            const role = await this.roleService.getRole(id);

            return res.status(HttpStatus.OK).json({
                "message" : "Role receveid with successfully",
                "data" : role,
            });
        } catch (error) {
            new ServiceUnavailableException();
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
                return res.status(HttpStatus.CREATED).json({
                    "message" : "Role created with successfully",
                    "data" : role,
                });
            }
        } catch {
            return res.status(HttpStatus.NOT_FOUND).json({
                "message" : "Role are not created",
                "data" : [],
            });
        }
    }

    @Put(":id")
    async updateRole(
        @Body() roleUpdateDto: UpdateRoleDto,
        @Res() res: Response, 
        @Param("id", ParseIntPipe ) id: number,
    ) : Promise<any> {
        try {
            const roleUpdate = await this.roleService.updateRole(id, roleUpdateDto);
            if (roleUpdate){
                return res.status(HttpStatus.CREATED).json({
                    "message" : "Role updated with successfully",
                    "data" : roleUpdate,
                });
            }
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).json({
                "message" : "Role are not updated",
                "error" : error,
                "data" : [],
            });
        }
    }

    @Delete(":id")
    async deleteRole(
        @Res() res: Response,
        @Param("id", ParseIntPipe) id: number
    ){
        try {
            const roleDeleted = await this.roleService.deleteRole(id);
            return res.status(HttpStatus.OK).json({
                message : "Role deleted successfully",
                data : roleDeleted
            })
        } catch (error) {
            throw new NotFoundException('Please try again')
        }
    }

}
