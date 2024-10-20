export class CreateAppointmentDto {
    userId: string;
    customerId: string;
    serviceId: string;
    treatmentId: string;
    appointmentDate: Date;
    startTime: string;
    notes?: string;
    status: 'pending' | 'confirmed' | 'completed' | 'canceled'; // Appointment status
  }