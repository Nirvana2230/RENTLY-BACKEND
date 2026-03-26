import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../users/user.entity';
import { Booking } from '../../bookings/entities/booking.entity';
import { Review } from '../../reviews/entity';

@Entity()
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column('decimal')
  pricePerNight: number;

  @Column()
  location: string;

  @Column({ default: 1 })
  guests: number;

  @Column({ nullable: true })
  imageUrl: string; // Foto 1

  @Column({ nullable: true })
  imageUrl2: string; // Foto 2

  @Column({ nullable: true })
  imageUrl3: string; // Foto 3

  @Column({ nullable: true })
  tags: string;

  // 🔥 NUEVA CAPA DE SEGURIDAD: Todas nacen pendientes 🔥
  @Column({ default: 'pendiente' })
  status: string;

  @ManyToOne(() => User, (user) => user.id)
  owner: User;

  @OneToMany(() => Booking, (booking) => booking.property)
  bookings: Booking[];

  @OneToMany(() => Review, (review) => review.property)
  reviews: Review[];
}

