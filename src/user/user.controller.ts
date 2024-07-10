import { Body, Controller, Get, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { UserEntity } from './entities/user.entity/user.entity';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiHeaders, ApiTags } from '@nestjs/swagger';
import { AddUserDto } from './dto/addUser.dto';
import { Response } from 'express';
import { LoginCredentialsDto } from './dto/login_credentials.dto';
import { AuthGuard } from 'src/jwt/auth.guard';

@ApiTags('api/user')
@Controller('api/user')
export class UserController {
    constructor(private readonly userService: UserService ){}

    @Get()
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async getUsers(): Promise<any> {
        return await this.userService.getUsers();
    }

    @Post()
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async addUser(
        @Body() addUserDto: AddUserDto,
        @Res() res: Response
    ): Promise<any> {
        try {
            const userCreated = await this.userService.createUser(addUserDto);

            return res.status(HttpStatus.OK).json({
                "message" : "User created with successfully",
                "data" : userCreated,
            });
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).json({
                "message" : "User has not been created",
                "data" : [],
                "error" : error,
            });
        }
    }

    @Post('/auth')
    async authUser(
        @Body() userCredentials: LoginCredentialsDto,
        @Res() res: Response
    ): Promise<any>{
        try {

            const user = await this.userService.loginUser(userCredentials);
            
            return res.status(HttpStatus.OK).json({
                "message" : "User has been authenticated successfully",
                "data" : user,
            });
            
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).json({
                "message" : "User has not been authentificated",
                "data" : [],
                "error" : error,
            });            
        }
    }
}
