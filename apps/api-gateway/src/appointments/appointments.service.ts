import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { IAppointment } from '@app/shared/interfaces/appointment.interface';

@Injectable()
export class AppointmentsService {
    constructor(
        @Inject('APPOINTMENT_SERVICE') private client: ClientProxy,
      ) {}
    async createAppointment(Appointment: IAppointment) : Promise<any>{
        const result =  await lastValueFrom(this.client.send({ cmd: 'createAppointment' }, Appointment));
        return result
    }
    
    async getAllAppointments(id: string) : Promise<any>{
        const result =  await lastValueFrom(this.client.send({ cmd: 'getAllAppointments' }, id));
        return result
    }

    async findAllAppointmentsDetails(id: string) : Promise<any>{
        const result =  await lastValueFrom(this.client.send({ cmd: 'findAllAppointmentsDetails' }, id));
        return result
    }

    async deleteAppointment(id: string) : Promise<any>{
        const result =  await lastValueFrom(this.client.send({ cmd: 'deleteAppointment' }, id));
        return result;
    }
}
