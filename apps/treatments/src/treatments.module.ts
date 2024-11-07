import { Module } from '@nestjs/common';
import { TreatmentsController } from './treatments.controller';
import { TreatmentsService } from './treatments.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Treatment } from './treatment.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './apps/treatments/.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [Treatment],
        synchronize: false, // Always set to false in production
        migrations: [__dirname + '/migrations/*.ts'], // Location of migrations
        migrationsRun: configService.get<string>('NODE_ENV') === 'production',
        ssl: { require: true, rejectUnauthorized: false },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Treatment]),
    ClientsModule.register([
      {
        name: 'APPOINTMENT_SERVICE',
        transport: Transport.TCP,
        options: { host: 'appointments', port: 3004 },
      },
    ]),
  ],
  controllers: [TreatmentsController],
  providers: [TreatmentsService],
})
export class TreatmentsModule {}
