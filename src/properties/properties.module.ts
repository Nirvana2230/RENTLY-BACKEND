import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertiesService } from './properties.service';
import { PropertiesController } from './properties.controller';
import { Property } from './entities/property.entity';
import { Review } from '../reviews/entity';
import { Booking } from '../bookings/entities/booking.entity';
import { Message } from './entities/message.entity'; // Importamos mensajes

@Module({
  imports: [TypeOrmModule.forFeature([Property, Review, Booking, Message])],
  controllers: [PropertiesController],
  providers: [PropertiesService],
})
export class PropertiesModule {}