import { Module } from '@nestjs/common';
import { TreatmentsController } from './treatments.controller';
import { TreatmentsService } from './treatments.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Treatment } from './treatment.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:'./apps/treatments/.env'
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
      synchronize: true, // For development
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Treatment]),
  ],
  controllers: [TreatmentsController],
  providers: [TreatmentsService],
})
export class TreatmentsModule {}
