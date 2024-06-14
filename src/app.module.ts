import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { CountryModule } from './country/country.module';
import { EstablishmentModule } from './establishment/establishment.module';
import * as dotenv from "dotenv";

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    UserModule,
    RoleModule,
    CountryModule,
    EstablishmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
