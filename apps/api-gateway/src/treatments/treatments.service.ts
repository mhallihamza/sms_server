import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ITreatment } from '@app/shared/interfaces/treatment.interface';

@Injectable()
export class TreatmentsService {
    constructor(
        @Inject('TREATMENT_SERVICE') private client: ClientProxy,
      ) {}
    async createTreatment(treatment: ITreatment) : Promise<any>{
        const result =  await lastValueFrom(this.client.send({ cmd: 'createTreatment' }, treatment));
        return result
    }
    
    async getAllTreatments(id: string) : Promise<any>{
        const treatments =  await lastValueFrom(this.client.send({ cmd: 'getAllTreatments' }, id));
        return treatments
    }
}
