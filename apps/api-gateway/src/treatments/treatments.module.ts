import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TreatmentsController } from './treatments.controller';
import { TreatmentsService } from './treatments.service';
@Module({
    imports: [
        ClientsModule.register([
          {
            name: 'TREATMENT_SERVICE',
            transport: Transport.TCP,
            options: { host: 'treatments', port: 3007 },
          },
        ]),
      ],
      providers: [TreatmentsService],
      controllers: [TreatmentsController]
})
export class TreatmentsModule {}
