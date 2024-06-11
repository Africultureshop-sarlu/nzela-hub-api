import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './entities/role.entity/role.entity';
import { AddroleMiddleware } from 'src/middlewares/addrole.middleware/addrole.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AddroleMiddleware).forRoutes(
      { path: 'role', method: RequestMethod.POST }
    );
  }
}
