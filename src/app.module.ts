/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { CountryModule } from './country/country.module';
import { EstablishmentModule } from './establishment/establishment.module';
import { ProvincialModule } from './provincial/provincial.module';
import { TownshipModule } from './township/township.module';
import { CommentModule } from './comment/comment.module';
import { TypeRoomModule } from './type_room/type_room.module';
import { RoomModule } from './room/room.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { BookingVehicleModule } from './booking_vehicle/booking_vehicle.module';
import { BookingRoomModule } from './booking_room/booking_room.module';
import { PaymentRoomModule } from './payment_room/payment_room.module';
import { PaymentVehicleModule } from './payment_vehicle/payment_vehicle.module';
import { UserRoleModule } from './user_role/user_role.module';
import { TypeEstablishmentModule } from './type_establishment/type_establishment.module';
import * as dotenv from 'dotenv';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { EmailServerModule } from './email-server/email-server.module';
import { SeedingModule } from './seeding/seeding.module';
import { PublicModule } from './public/public.module';
import { SettingModule } from './setting/setting.module';
import { CityModule } from './city/city.module';

dotenv.config({ path: process.env.NODE_ENV === 'production' ? '.env.prod' : '.env' });

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    MailerModule.forRoot({
      transport: {
        host: String(process.env.MAIL_HOST),
        port: Number(process.env.MAIL_PORT),
        secure: false,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      },
      // defaults: {
      //   from: '"nest-modules" <modules@nestjs.com>',
      // },
      template: {
        dir: __dirname + '/templates',
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    UserModule,
    RoleModule,
    CountryModule,
    EstablishmentModule,
    ProvincialModule,
    TownshipModule,
    CommentModule,
    TypeRoomModule,
    RoomModule,
    VehicleModule,
    BookingVehicleModule,
    BookingRoomModule,
    PaymentRoomModule,
    PaymentVehicleModule,
    UserRoleModule,
    TypeEstablishmentModule,
    EmailServerModule,
    SeedingModule,
    PublicModule,
    SettingModule,
    CityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
