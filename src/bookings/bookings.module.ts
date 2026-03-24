import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { Booking } from './entities/booking.entity';

@Module({
  // Importamos el TypeOrmModule y le pasamos la entidad Booking
  // para que el repositorio esté disponible en el servicio.
  imports: [TypeOrmModule.forFeature([Booking])],
  controllers: [BookingsController],
  providers: [BookingsService],
  exports: [BookingsService], // Opcional: por si otros módulos necesitan usar este servicio
})
export class BookingsModule {}
