import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { AuthModule } from './auth/auth.module';
import { User } from './users/user.entity';
import { PropertiesModule } from './properties/properties.module';
import { Property } from './properties/entities/property.entity';
import { BookingsModule } from './bookings/bookings.module';
import { Booking } from './bookings/entities/booking.entity';
import { Review } from './reviews/entity';
import { Message } from './properties/entities/message.entity';
@Module({

  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12908712', // 🚨 Pon tu contraseña real aquí
      database: 'Rently_db',
      entities: [User, Property, Booking, Review,Message],
      synchronize: true,
    }),
    AuthModule,
    PropertiesModule,
    BookingsModule,
  ],
})
export class AppModule {}