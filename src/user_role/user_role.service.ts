import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRoleEntity } from './entities/user_role.entity/user_role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserRoleService {
    constructor(
        @InjectRepository(UserRoleEntity)
        private userRoleRepository: Repository<UserRoleEntity>
    ){}

    async allUserRoles(): Promise<UserRoleEntity[]> {
        try {
            return await this.userRoleRepository.find({
                order: {
                    id: 'DESC'
                }
            })
        } catch (error) {
            throw new NotFoundException("Request failed, please try again")
        }
    }
}
