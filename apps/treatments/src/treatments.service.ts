import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { Repository } from 'typeorm';
import { lastValueFrom } from 'rxjs';
import { Treatment } from './treatment.entity';
import { ITreatment } from '@app/shared/interfaces/treatment.interface';

@Injectable()
export class TreatmentsService {
  constructor(
    @InjectRepository(Treatment)
    private readonly userRepository: Repository<Treatment>,
    @Inject('APPOINTMENT_SERVICE') private client: ClientProxy,
  ) {}

  async createTreatment(treatment: ITreatment): Promise<any> {
    const res = await this.userRepository.save(treatment);
    console.log(res);
    return `Treatment created successfully`;
  }

  async findAllTreatments(id: string): Promise<any> {
    const treatments = await this.userRepository.find({
      where: { userId: id },
    });
    console.log(treatments);
    return treatments;
  }

  async deleteTreatment(id: string): Promise<any> {
    await lastValueFrom(
      this.client.send({ cmd: 'deleteAppointmentByTreatment' }, id),
    );
    const treatment = await this.userRepository.findOneBy({
      treatmentId: id,
    });
    const result = await this.userRepository.remove(treatment);
    return result;
  }

  async deleteTreatmentByService(id: string): Promise<any> {
    const result = await this.userRepository.delete({
      serviceId: id,
    });
    return result;
  }
}
