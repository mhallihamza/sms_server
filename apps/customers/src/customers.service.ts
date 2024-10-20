import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { ICustomer } from '@app/shared/interfaces/customer.interface';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly userRepository: Repository<Customer>,
  ) {}

  async createCustomer(customer:ICustomer):Promise<any> {
    const res = await this.userRepository.save(customer);
    console.log(res);
    return `Customer created successfully`
  }

  async findAllCustomers(id:string):Promise<any> {
    const customers = await this.userRepository.find({
      where: {userId: id}
    });
    console.log(customers);
    return customers
  }

  async deleteCustomer(id:string):Promise<any> {
    const customer = await this.userRepository.findOneBy({
    customerId: id,
    })
    const result = await this.userRepository.remove(customer)
    return result;
  }
}
