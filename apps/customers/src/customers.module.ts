import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:'./apps/customers/.env'
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
      entities: [Customer],
      synchronize: true, // For development
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Customer]),
  ],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
