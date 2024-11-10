import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TreatmentsController } from './treatments.controller';
import { TreatmentsService } from './treatments.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './apps/api-gateway/.env',
    }),
    ClientsModule.registerAsync([
      {
        name: 'TREATMENT_SERVICE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('TREATMENTS_HOST'), // Fetch from .env
            port: 3007,
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [TreatmentsService],
  controllers: [TreatmentsController],
})
export class TreatmentsModule {}
