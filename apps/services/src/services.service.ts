import { Injectable } from '@nestjs/common';
import { IService } from '@app/shared/interfaces/service.interface';
import { Service } from './service.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly userRepository: Repository<Service>,
  ) {}

  async createService(service:IService):Promise<any> {
    const res = await this.userRepository.save(service);
    console.log(res);
    return `Service created successfully`
  }

  async findAllServices(id:string):Promise<any> {
    const services = await this.userRepository.find({
      where: {userId: id}
    });
    console.log(services);
    return services
  }
}
