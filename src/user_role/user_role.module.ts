import { Module } from '@nestjs/common';
import { UserRoleController } from './user_role.controller';
import { UserRoleService } from './user_role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRoleEntity } from './entities/user_role.entity/user_role.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/jwt/constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRoleEntity]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    })
  ],
  controllers: [UserRoleController],
  providers: [UserRoleService]
})
export class UserRoleModule {}
