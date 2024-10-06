import { Module } from '@nestjs/common';
import { StaffController } from './staff.controller';
import { StaffService } from './staff.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Staff } from './staff.entity';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:'./apps/staff/.env'
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
      entities: [Staff],
      synchronize: true, // For development
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Staff]),
  ],
  controllers: [StaffController],
  providers: [StaffService],
})
export class StaffModule {}
