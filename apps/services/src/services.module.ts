import { Module } from '@nestjs/common';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './service.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:'./apps/services/.env'
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
      entities: [Service],
      synchronize: true, // For development
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Service]),
  ],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {}
