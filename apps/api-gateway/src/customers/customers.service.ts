import { Injectable , Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ICustomer } from '@app/shared/interfaces/customer.interface';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CustomersService {
    constructor(
        @Inject('CUSTOMER_SERVICE') private client: ClientProxy,
      ) {}
    async createCustomer(customer: ICustomer) : Promise<any>{
        const result =  await lastValueFrom(this.client.send({ cmd: 'createCustomer' }, customer));
        return result
    }
    
    async getAllCustomers(id: string) : Promise<any>{
        const result =  await lastValueFrom(this.client.send({ cmd: 'getAllCustomers' }, id));
        return result
    }

    async deleteCustomer(id: string) : Promise<any>{
        const result =  await lastValueFrom(this.client.send({ cmd: 'deleteCustomer' }, id));
        return result
    }
}
