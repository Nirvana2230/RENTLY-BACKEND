import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/user.entity';
import { Property } from '../../properties/entities/property.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  startDate: string;

  @Column({ type: 'date' })
  endDate: string;

  @Column({ default: 'pending' }) // pending, confirmed, cancelled
  status: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @ManyToOne(() => Property, (property) => property.id)
  property: Property;
}
