import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity';
import { IAppointment } from '@app/shared/interfaces/appointment.interface';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly userRepository: Repository<Appointment>,
  ) {}

  async createAppointment(customer:IAppointment):Promise<any> {
    const res = await this.userRepository.save(customer);
    console.log(res);
    return `Appointment created successfully`
  }

  async findAllAppointments(id:string):Promise<any> {
    const appointments = await this.userRepository.find({
      where: {userId: id}
    });
    return appointments
  }
}
