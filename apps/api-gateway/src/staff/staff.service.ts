import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { IStaff } from '@app/shared/interfaces/staff.interface';

@Injectable()
export class StaffService {
  constructor(@Inject('STAFF_SERVICE') private client: ClientProxy) {}
  async createStaff(staff: IStaff): Promise<any> {
    const result = await lastValueFrom(
      this.client.send({ cmd: 'createStaff' }, staff),
    );
    return result;
  }

  async getAllStaff(id: string): Promise<any> {
    const result = await lastValueFrom(
      this.client.send({ cmd: 'getAllStaff' }, id),
    );
    return result;
  }

  async deleteStaff(id: string): Promise<any> {
    const result = await lastValueFrom(
      this.client.send({ cmd: 'deleteStaff' }, id),
    );
    return result;
  }
}
