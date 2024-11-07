import { Module } from '@nestjs/common';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './appointment.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './apps/appointments/.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [Appointment],
        synchronize: false, // Always set to false in production
        migrations: [__dirname + '/migrations/*.ts'], // Location of migrations
        migrationsRun: configService.get<string>('NODE_ENV') === 'production',
        ssl: { require: true, rejectUnauthorized: false },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Appointment]),
    ClientsModule.register([
      {
        name: 'CUSTOMER_SERVICE',
        transport: Transport.TCP,
        options: { host: 'customers', port: 3003 },
      },
      {
        name: 'TREATMENT_SERVICE',
        transport: Transport.TCP,
        options: { host: 'treatments', port: 3007 },
      },
      {
        name: 'STAFF_SERVICE',
        transport: Transport.TCP,
        options: { host: 'staff', port: 3005 },
      },
    ]),
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
})
export class AppointmentsModule {}
