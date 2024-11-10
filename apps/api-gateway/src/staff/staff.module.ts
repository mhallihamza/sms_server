import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { StaffController } from './staff.controller';
import { StaffService } from './staff.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './apps/api-gateway/.env',
    }),
    ClientsModule.registerAsync([
      {
        name: 'STAFF_SERVICE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('STAFF_HOST'), // Fetch from .env
            port: 3005,
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [StaffService],
  controllers: [StaffController],
})
export class StaffModule {}
