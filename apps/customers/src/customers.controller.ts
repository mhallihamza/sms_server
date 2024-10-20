import { Controller, Get } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @MessagePattern({ cmd: 'createCustomer' })
  createCustomer(data:any):Promise<any> {
    return this.customersService.createCustomer(data)
  }

  @MessagePattern({ cmd: 'getAllCustomers' })
  findAllCustomers(id:string):Promise<any> {
    return this.customersService.findAllCustomers(id)
  }

  @MessagePattern({ cmd: 'deleteCustomer' })
  deleteCustomer(id:string):Promise<any> {
    return this.customersService.deleteCustomer(id)
  }
}
