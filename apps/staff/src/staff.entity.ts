import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('staff')
export class Staff {
  @PrimaryGeneratedColumn('uuid')
  staffId: string;

  @Column({ type: 'varchar', length: 100 })
  firstName: string;

  @Column({ type: 'varchar', length: 100 })
  lastName: string;

  @Column({ type: 'varchar', length: 150, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 15, unique: true })
  phoneNumber: string;

  @Column({ type: 'varchar', nullable: true })
  address?: string;

  @Column({ nullable: true })
  profilePicture: string;
  
  @Column({ type: 'varchar', length: 100 })
  position: string;

  @Column({ type: 'enum', enum: ['Male', 'Female', 'Other'], default: 'Other' })
  gender: 'Male' | 'Female' | 'Other';

  @Column({ type: 'uuid', nullable: false })
  userId: string;

  @Column({ type: 'boolean', default: true })
  isAvailable: boolean;

  // Automatically set when a new customer is created
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  // Automatically updated when customer details are modified
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}