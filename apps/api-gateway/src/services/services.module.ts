import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './apps/api-gateway/.env',
    }),
    ClientsModule.registerAsync([
      {
        name: 'SERVICE_SERVICE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('SERVICES_HOST'), // Fetch from .env
            port: 3006,
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [ServicesService],
  controllers: [ServicesController],
})
export class ServicesModule {}
