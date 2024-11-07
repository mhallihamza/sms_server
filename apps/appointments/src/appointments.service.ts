import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity';
import { IAppointment } from '@app/shared/interfaces/appointment.interface';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly userRepository: Repository<Appointment>,
    @Inject('CUSTOMER_SERVICE') private clientCustomer: ClientProxy,
    @Inject('TREATMENT_SERVICE') private clientTreatment: ClientProxy,
    @Inject('STAFF_SERVICE') private clientStaff: ClientProxy,
  ) {}

  async createAppointment(appointment: IAppointment): Promise<any> {
    const res = await this.userRepository.save(appointment);
    console.log(res);
    return `Appointment created successfully`;
  }

  async findAllAppointments(id: string): Promise<any> {
    const appointments = await this.userRepository.find({
      where: { userId: id },
    });
    return appointments;
  }

  async findAllAppointmentsDetails(id: string): Promise<any> {
    const appointments = await this.userRepository.find({
      where: { userId: id },
    });
    const customers = await lastValueFrom(
      this.clientCustomer.send({ cmd: 'getAllCustomers' }, id),
    );
    const treatments = await lastValueFrom(
      this.clientTreatment.send({ cmd: 'getAllTreatments' }, id),
    );
    const staff = await lastValueFrom(
      this.clientStaff.send({ cmd: 'getAllStaff' }, id),
    );
    return appointments.map((appointment) => ({
      ...appointment,
      customer: customers.find(
        (el) => el.customerId === appointment.customerId,
      ),
      treatment: treatments.find(
        (el) => el.treatmentId === appointment.treatmentId,
      ),
      staff: staff.find((el) => el.staffId === appointment.staffId),
    }));
  }

  async deleteAppointment(id: string): Promise<any> {
    const appointment = await this.userRepository.findOneBy({
      appointmentId: id,
    });
    const result = await this.userRepository.remove(appointment);
    return result;
  }

  async deleteAppointmentByCustomer(id: string): Promise<any> {
    const result = await this.userRepository.delete({
      customerId: id,
    });
    return result;
  }

  async deleteAppointmentByStaff(id: string): Promise<any> {
    const result = await this.userRepository.delete({
      staffId: id,
    });
    return result;
  }

  async deleteAppointmentByTreatment(id: string): Promise<any> {
    const result = await this.userRepository.delete({
      treatmentId: id,
    });
    return result;
  }

  async deleteAppointmentByService(id: string): Promise<any> {
    const result = await this.userRepository.delete({
      serviceId: id,
    });
    return result;
  }
}
