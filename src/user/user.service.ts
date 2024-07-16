/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity/user.entity';
import { AddUserDto } from './dto/addUser.dto';
import { RoleEntity } from 'src/role/entities/role.entity/role.entity';
import * as bcrypt from 'bcrypt';
import { UserRoleEntity } from 'src/user_role/entities/user_role.entity/user_role.entity';
import { LoginCredentialsDto } from './dto/login_credentials.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,

        @InjectRepository(RoleEntity)
        private roleRepository: Repository<RoleEntity>,

        private dataSource: DataSource,
        private jwtService: JwtService,
    ){}

    async getUsers(): Promise<any> {
        return {
            message: 'Data received with successful',
            data: await this.userRepository.find({
                select: ['uuid', 'birthdate', 'email', 'firstname', 'lastname', 'middlename', 'paiment_informations', 'wallet', 'username']
            }),
        };
    }

    async getUserMoreInfo(id: string): Promise<UserEntity> {
        return await this.userRepository.findOne({
            where: {
                uuid: id,
            },
            relations: ['roles']
        })
    }

    async createUser(addUserDto: AddUserDto): Promise<any> {
        
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const { role_id,  } = addUserDto;

            const roleFound = await queryRunner.manager.findOne(RoleEntity, {
                where: {
                    uuid: role_id,
                },
            });

            if(! roleFound) {
                return null;
            }else {

                const user = this.userRepository.create({
                    ...addUserDto,
                });

                user.wallet = 0;
                const salt = await bcrypt.genSalt();
                user.password = await bcrypt.hash(user.password, salt);

                const userCreated = await queryRunner.manager.save(UserEntity, user);

                const role = new UserRoleEntity();
                role.user = userCreated;
                role.role = roleFound;

                await queryRunner.manager.save(UserRoleEntity, role);

                await queryRunner.commitTransaction();

                return {
                    "uuid" : userCreated.uuid,
                    "username": userCreated.username,
                    "firstname": userCreated.firstname,
                    "middlename": userCreated.middlename,
                    "lastname": userCreated.lastname,
                    "email": userCreated.email,
                    "wallet": userCreated.wallet,
                    "birthdate": userCreated.birthdate,
                };
            }

        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw new NotFoundException("Request failed, please try again " + error);
        } finally {
            await queryRunner.release();
        }
    }

    async loginUser(credentials: LoginCredentialsDto): Promise<any> {

        const { username, password } = credentials;

        const user = await this.userRepository.findOne({
            where: {
                email: username,
            }
        })

        if (! user) {
            throw new NotFoundException(`The username or password is not correct`);
        }
        // const passwordHashed = await bcrypt.hash(password, user.salt);
        if( await bcrypt.compare(password, user.password) === true ) {

            const payload = { uuid: user.uuid, email: user.email, firstname: user.firstname, lastname: user.lastname };
            const jwt = await this.jwtService.signAsync(payload);

            return {
                "user": {
                    "uuid" : user.uuid,
                    "username": user.username,
                    "firstname": user.firstname,
                    "middlename": user.middlename,
                    "lastname": user.lastname,
                    "email": user.email,
                    "wallet": user.wallet,
                    "birthdate": user.birthdate,
                },
                "access_token": jwt,
            };
        }else {
            throw new NotFoundException(`The username or password is not correct`);
        }
    }
 
}
