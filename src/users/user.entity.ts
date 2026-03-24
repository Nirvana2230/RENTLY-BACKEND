import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true }) // El email no se puede repetir
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  picture: string;

  @Column({ nullable: true })
  googleId: string; // Aquí guardamos el ID que nos da Google

  @Column({ default: 'user' }) // Puede ser 'admin' o 'user'
  role: string;
}