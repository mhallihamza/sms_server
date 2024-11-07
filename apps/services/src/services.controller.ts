import { Controller } from '@nestjs/common';
import { ServicesService } from './services.service';
import { MessagePattern } from '@nestjs/microservices';
@Controller()
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @MessagePattern({ cmd: 'createService' })
  async createCustomer(data: any): Promise<any> {
    return this.servicesService.createService(data);
  }

  @MessagePattern({ cmd: 'getAllServices' })
  async findAllCustomers(id: string): Promise<any> {
    return this.servicesService.findAllServices(id);
  }

  @MessagePattern({ cmd: 'deleteService' })
  async deleteService(id: string): Promise<any> {
    return this.servicesService.deleteService(id);
  }
}
