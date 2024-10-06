import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
@Module({
    imports: [
      ClientsModule.register([
        {
          name: 'SERVICE_SERVICE',
          transport: Transport.TCP,
          options: { host: 'localhost', port: 3006 },
        },
      ]),
    ],
    providers: [ServicesService],
    controllers: [ServicesController]
  })
export class ServicesModule {}
