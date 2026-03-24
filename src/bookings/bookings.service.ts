import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
  ) {}

  async create(createBookingDto: CreateBookingDto) {
    const newBooking = this.bookingRepository.create({
      startDate: createBookingDto.startDate,
      endDate: createBookingDto.endDate,
      user: { id: createBookingDto.userId },
      property: { id: createBookingDto.propertyId },
    });
    return await this.bookingRepository.save(newBooking);
  }

  async findAll() {
    return await this.bookingRepository.find({ relations: ['user', 'property'] });
  }

  // Agregamos estos métodos para que el controlador no de error 👇
  async findOne(id: number) {
    return await this.bookingRepository.findOne({ where: { id }, relations: ['user', 'property'] });
  }

  async update(id: number, updateBookingDto: any) {
    await this.bookingRepository.update(id, updateBookingDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.bookingRepository.delete(id);
    return { deleted: true };
  }
}