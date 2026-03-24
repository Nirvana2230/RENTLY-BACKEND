import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from './entities/property.entity';
import { Review } from '../reviews/entity';
import { Booking } from '../bookings/entities/booking.entity';
import { Message } from './entities/message.entity';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Property) private propertyRepository: Repository<Property>,
    @InjectRepository(Review) private reviewRepository: Repository<Review>,
    @InjectRepository(Booking) private bookingRepository: Repository<Booking>,
    @InjectRepository(Message) private messageRepository: Repository<Message>,
  ) {}

  create(createPropertyDto: any) {
    const newProperty = this.propertyRepository.create({ ...createPropertyDto, owner: { id: createPropertyDto.ownerId } });
    return this.propertyRepository.save(newProperty);
  }

  findAll(term?: string, page?: number, limit?: number) {
    const query = this.propertyRepository.createQueryBuilder('property');
    query.leftJoinAndSelect('property.owner', 'owner');
    
    // ✨ AQUÍ LE DECIMOS QUE TRAIGA A LOS INQUILINOS (BOOKINGS) ✨
    query.leftJoinAndSelect('property.bookings', 'bookings');
    query.leftJoinAndSelect('bookings.user', 'tenant');

    if (term) query.andWhere('(LOWER(property.title) LIKE LOWER(:term) OR LOWER(property.location) LIKE LOWER(:term) OR LOWER(property.tags) LIKE LOWER(:term))', { term: `%${term}%` });
    if (page && limit) query.skip((page - 1) * limit).take(limit);
    return query.getMany();
  }

  async findOne(id: number) {
    return await this.propertyRepository.findOne({ where: { id }, relations: ['owner', 'bookings', 'reviews', 'reviews.user'] });
  }

  async remove(id: number) {
    await this.reviewRepository.delete({ property: { id } });
    await this.bookingRepository.delete({ property: { id } });
    await this.messageRepository.delete({ propertyId: id });
    return this.propertyRepository.delete(id);
  }

  async addReview(propertyId: number, userId: number, comment: string, rating: number) {
    const hasBooking = await this.bookingRepository.findOne({ where: { user: { id: userId }, property: { id: propertyId } } });
    if (!hasBooking) throw new Error('Solo huéspedes que han pagado pueden dejar reseñas.');
    const review = this.reviewRepository.create({ comment, rating, user: { id: userId }, property: { id: propertyId } });
    return await this.reviewRepository.save(review);
  }

  async getMessages(propertyId: number, user1: number, user2: number) {
    return this.messageRepository.find({
      where: [ { propertyId, senderId: user1, receiverId: user2 }, { propertyId, senderId: user2, receiverId: user1 } ],
      order: { createdAt: 'ASC' }
    });
  }

  async sendMessage(propertyId: number, senderId: number, receiverId: number, text: string) {
    const msg = this.messageRepository.create({ propertyId, senderId, receiverId, text });
    return this.messageRepository.save(msg);
  }
}