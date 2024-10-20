import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  appointmentId: string;

  @Column({ type: 'uuid', nullable: false })
  customerId: string; // Foreign key for Customer (managed by another microservice)

  @Column({ type: 'uuid', nullable: false })
  serviceId: string;  // Foreign key for Service (managed by another microservice)

  @Column({ type: 'uuid', nullable: false })
  userId: string;

  @Column({ type: 'uuid', nullable: false })
  staffId: string;

  @Column({ type: 'uuid', nullable: false })
  treatmentId: string;

  @Column({ type: 'date' })
  appointmentDate: Date;

  @Column({ type: 'time' })
  startTime: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  notes?: string;

  @Column({ default: 'pending' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}