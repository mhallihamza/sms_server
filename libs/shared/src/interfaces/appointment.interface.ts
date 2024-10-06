export interface IAppointment {
    customerId: string; // Foreign key for the Customer
    serviceId: string; // Foreign key for the Service
    userId: string;
    appointmentDate: Date; // The date of the appointment
    startTime: string; // The start time of the appointment (HH:mm:ss)
    notes?: string; // Optional notes about the appointment
    status: 'pending' | 'confirmed' | 'completed' | 'canceled'; // Appointment status
  }
  