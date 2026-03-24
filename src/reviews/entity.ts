import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Property } from '../properties/entities/property.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  @Column({ default: 5 })
  rating: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Property, (property) => property.reviews)
  property: Property;
}