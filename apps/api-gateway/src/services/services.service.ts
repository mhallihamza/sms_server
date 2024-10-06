import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { IService } from '@app/shared/interfaces/service.interface';

@Injectable()
export class ServicesService {
    constructor(
        @Inject('SERVICE_SERVICE') private client: ClientProxy,
      ) {}
    async createService(service: IService) : Promise<any>{
        const result =  await lastValueFrom(this.client.send({ cmd: 'createService' }, service));
        return result
    }
    
    async getAllServices(id: string) : Promise<any>{
        const result =  await lastValueFrom(this.client.send({ cmd: 'getAllServices' }, id));
        return result
    }
}
