import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from './entities/role.entity/role.entity';
import { AddRoleDto } from './dto/addRole.dto';

@Injectable()
export class RoleService {

    constructor(

        @InjectRepository(RoleEntity)
        private roleRepository: Repository<RoleEntity>

    ){}

    async getRoles(): Promise<any> {
        return await this.roleRepository.find({
            order: {
                id: 'DESC',
            },
        });
    }

    async getRole(roleId: number): Promise<any> {
        return await this.roleRepository.findOne({
            where: {
                id: roleId
            }
        } );
    }

    async createRole(data: AddRoleDto): Promise<RoleEntity> {
        return await this.roleRepository.save(data);
    }

    async updateRole(id: number, data: AddRoleDto): Promise<RoleEntity>{
        const role = await this.roleRepository.preload({
            id,
            ...data
        });
        return await this.roleRepository.save(role);
        // return await this.roleRepository.update(data);
    }

}
