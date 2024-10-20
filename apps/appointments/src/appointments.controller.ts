import { Controller } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @MessagePattern({ cmd: 'createAppointment' })
  createAppointment(data:any):Promise<any> {
    return this.appointmentsService.createAppointment(data)
  }

  @MessagePattern({ cmd: 'getAllAppointments' })
  findAllAppointmennts(id:string):Promise<any> {
    return this.appointmentsService.findAllAppointments(id)
  }
  
  @MessagePattern({ cmd: 'findAllAppointmentsDetails' })
  findAllAppointmentsDetails(id:string):Promise<any> {
    return this.appointmentsService.findAllAppointmentsDetails(id)
  }

  @MessagePattern({ cmd: 'deleteAppointment' })
  deleteAppointment(id:string):Promise<any> {
    return this.appointmentsService.deleteAppointment(id)
  }
}
