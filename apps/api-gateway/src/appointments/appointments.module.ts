import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [
      ClientsModule.register([
        {
          name: 'APPOINTMENT_SERVICE',
          transport: Transport.TCP,
          options: { host: 'localhost', port: 3004 },
        },
      ]),
    ],
    providers: [AppointmentsService],
    controllers: [AppointmentsController]
  })
export class AppointmentsModule {}
