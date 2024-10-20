import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('services')
export class Service {
  @PrimaryGeneratedColumn('uuid')
  serviceId: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', nullable: true })
  image: string; // URL or file path of the image

  @Column({ type: 'int', nullable: true })
  minDuration: number;

  @Column({ type: 'int', nullable: true })
  maxDuration: number; // URL or file path of the image

  @Column({ type: 'int', nullable: true })
  startPrice: number;

  @Column({ type: 'uuid', nullable: false })
  userId: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  // Automatically set when a new customer is created
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  // Automatically updated when customer details are modified
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}