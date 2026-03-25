import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { AuthModule } from './auth/auth.module';
import { PropertiesModule } from './properties/properties.module';
import { BookingsModule } from './bookings/bookings.module';

import { User } from './users/user.entity';
import { Property } from './properties/entities/property.entity';
import { Booking } from './bookings/entities/booking.entity';
import { Review } from './reviews/entity';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    ConfigModule.forRoot({ isGlobal: true }),

    // AQUÍ ESTÁ EL BLOQUE ASÍNCRONO CORRECTO
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        entities: [User, Property, Booking, Review],
        synchronize: true,
        ssl: { rejectUnauthorized: false }, 
      }),
    }),

    AuthModule,
    PropertiesModule,
    BookingsModule,
  ],
})
export class AppModule {}