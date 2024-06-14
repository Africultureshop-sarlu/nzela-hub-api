import { Injectable, NotFoundException } from '@nestjs/common';
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
        if(! role){
            throw new NotFoundException(`The role with this id ${id} does not exist`);
        }else {
            return await this.roleRepository.save(role);
        }
        // return await this.roleRepository.update(data);
    }

    async deleteRole(id: number) : Promise<any> {
        try {
            const role = await this.roleRepository.findOne({
                where: {
                    id : id,
                }
            });
            if(!role){
                throw new NotFoundException(`This role ${id} does not exist`);
            }
            const roleDeleted = await this.roleRepository.delete(role);
        } catch (error) {
            throw new NotFoundException(`This role ${id} does not exist`);
        }
    }
}
