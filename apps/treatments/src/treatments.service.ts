import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Treatment } from './treatment.entity';
import { ITreatment } from '@app/shared/interfaces/treatment.interface';

@Injectable()
export class TreatmentsService {
  constructor(
    @InjectRepository(Treatment)
    private readonly userRepository: Repository<Treatment>,
  ) {}

  async createTreatment(treatment:ITreatment):Promise<any> {
    const res = await this.userRepository.save(treatment);
    console.log(res);
    return `Treatment created successfully`
  }

  async findAllTreatments(id:string):Promise<any> {
    const treatments = await this.userRepository.find({
      where: {userId: id}
    });
    console.log(treatments);
    return treatments
  }
}
