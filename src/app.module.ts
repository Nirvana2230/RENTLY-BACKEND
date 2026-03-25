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
// import { Message } from './properties/entities/message.entity';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    // ← Esto es lo que arregla la lectura del .env
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',        // ← importante
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Property, Booking, Review /*, Message */],
      synchronize: true,
    }),

    AuthModule,
    PropertiesModule,
    BookingsModule,
  ],
})
export class AppModule {}