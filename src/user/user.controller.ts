import { Controller, Get } from '@nestjs/common';
import { UserEntity } from './entities/user.entity/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService ){}

    @Get()
    async getUsers(): Promise<any> {
        return await this.userService.getUsers();
    }
}
