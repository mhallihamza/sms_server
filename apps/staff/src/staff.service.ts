import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Staff } from './staff.entity';
import { IStaff } from '@app/shared/interfaces/staff.interface';
@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff)
    private readonly userRepository: Repository<Staff>,
  ) {}

  async createStaff(staff:IStaff):Promise<any> {
    const res = await this.userRepository.save(staff);
    console.log(res);
    return `Staff created successfully`
  }

  async findAllStaff(id:string):Promise<any> {
    const staff = await this.userRepository.find({
      where: {userId: id}
    });
    console.log(staff);
    return staff
  }
}
