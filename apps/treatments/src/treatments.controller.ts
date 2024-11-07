import { Controller } from '@nestjs/common';
import { TreatmentsService } from './treatments.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class TreatmentsController {
  constructor(private readonly treatmentsService: TreatmentsService) {}

  @MessagePattern({ cmd: 'createTreatment' })
  createCustomer(data: any): Promise<any> {
    return this.treatmentsService.createTreatment(data);
  }

  @MessagePattern({ cmd: 'getAllTreatments' })
  findAllCustomers(id: string): Promise<any> {
    return this.treatmentsService.findAllTreatments(id);
  }

  @MessagePattern({ cmd: 'deleteTreatment' })
  deleteTreatment(id: string): Promise<any> {
    return this.treatmentsService.deleteTreatment(id);
  }

  @MessagePattern({ cmd: 'deleteTreatmentByService' })
  deleteTreatmentByService(id: string): Promise<any> {
    return this.treatmentsService.deleteTreatmentByService(id);
  }
}
