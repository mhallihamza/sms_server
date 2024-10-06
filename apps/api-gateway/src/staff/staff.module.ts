import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { StaffController } from './staff.controller';
import { StaffService } from './staff.service';

@Module({
    imports: [
      ClientsModule.register([
        {
          name: 'STAFF_SERVICE',
          transport: Transport.TCP,
          options: { host: 'localhost', port: 3005 },
        },
      ]),
    ],
    providers: [StaffService],
    controllers: [StaffController]
  })
export class StaffModule {}
