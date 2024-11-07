import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IService } from '@app/shared/interfaces/service.interface';
import { Service } from './service.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly userRepository: Repository<Service>,
    @Inject('TREATMENT_SERVICE') private clientTreatment: ClientProxy,
    @Inject('APPOINTMENT_SERVICE') private clientAppointment: ClientProxy,
  ) {}

  async createService(service: IService): Promise<any> {
    const res = await this.userRepository.save(service);
    console.log(res);
    return `Service created successfully`;
  }

  async findAllServices(id: string): Promise<any> {
    const services = await this.userRepository.find({
      where: { userId: id },
    });
    console.log(services);
    return services;
  }

  async deleteService(id: string): Promise<any> {
    await this.clientTreatment.send({cmd: 'deleteTreatmentByService'}, id)
    await this.clientAppointment.send({ cmd: 'deleteAppointmentByService' }, id);
    const result = await this.userRepository.delete({

      serviceId: id
    })
    return result
  }
}
