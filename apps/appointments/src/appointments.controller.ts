import { Controller } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @MessagePattern({ cmd: 'createCustomer' })
  createCustomer(data:any):Promise<any> {
    return this.appointmentsService.createAppointment(data)
  }

  @MessagePattern({ cmd: 'getAllCustomers' })
  findAllCustomers(id:string):Promise<any> {
    return this.appointmentsService.findAllAppointments(id)
  }
}
