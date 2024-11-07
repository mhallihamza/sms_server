import { Controller } from '@nestjs/common';
import { StaffService } from './staff.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @MessagePattern({ cmd: 'createStaff' })
  createStaff(data: any): Promise<any> {
    return this.staffService.createStaff(data);
  }

  @MessagePattern({ cmd: 'getAllStaff' })
  findAllStaff(id: string): Promise<any> {
    return this.staffService.findAllStaff(id);
  }

  @MessagePattern({ cmd: 'deleteStaff' })
  deleteStaff(id: string): Promise<any> {
    return this.staffService.deleteStaff(id);
  }
}
