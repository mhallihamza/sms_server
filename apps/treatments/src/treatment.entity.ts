import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('treatments')
export class Treatment {
  @PrimaryGeneratedColumn('uuid')
  treatmentId: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', nullable: true })
  image: string; // URL or file path of the image

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  price: number;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'int' })
  duration: number; // Duration in minutes
  
  @Column({ type: 'uuid', nullable: false })
  serviceId: string;

  @Column({ type: 'uuid', nullable: false })
  userId: string;

  // Automatically set when a new customer is created
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  // Automatically updated when customer details are modified
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}