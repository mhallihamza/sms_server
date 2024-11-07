import { Module } from '@nestjs/common';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Service } from './service.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './apps/services/.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [Service],
        synchronize: false, // Always set to false in production
        migrations: [__dirname + '/migrations/*.ts'], // Location of migrations
        migrationsRun: configService.get<string>('NODE_ENV') === 'production',
        ssl: { require: true, rejectUnauthorized: false },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Service]),
    ClientsModule.register([
      {
        name: 'APPOINTMENT_SERVICE',
        transport: Transport.TCP,
        options: { host: 'appointments', port: 3004 },
      },
      {
        name: 'TREATMENT_SERVICE',
        transport: Transport.TCP,
        options: { host: 'treatments', port: 3007 },
      },
    ]),
  ],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {}
