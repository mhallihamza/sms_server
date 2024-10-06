// auth/entities/auth-user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('auth_users')
export class AuthUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phoneNumber: string;

  @Column({ default: 'user' })
  role: string;
}