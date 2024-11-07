import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { lastValueFrom } from 'rxjs';
import { Repository } from 'typeorm';
import { Staff } from './staff.entity';
import { IStaff } from '@app/shared/interfaces/staff.interface';
@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff)
    private readonly userRepository: Repository<Staff>,
    @Inject('APPOINTMENT_SERVICE') private client: ClientProxy,
  ) {}

  async createStaff(staff: IStaff): Promise<any> {
    const res = await this.userRepository.save(staff);
    console.log(res);
    return `Staff created successfully`;
  }

  async findAllStaff(id: string): Promise<any> {
    const staff = await this.userRepository.find({
      where: { userId: id },
    });
    console.log(staff);
    return staff;
  }

  async deleteStaff(id: string): Promise<any> {
    await lastValueFrom(
      this.client.send({ cmd: 'deleteAppointmentByStaff' }, id),
    );
    const staff = await this.userRepository.findOneBy({
      staffId: id,
    });
    const result = await this.userRepository.remove(staff);
    return result;
  }
}
