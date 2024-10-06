import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:'./apps/users/.env'
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>  ({
      type: 'postgres',
      host: configService.get<string>('DATABASE_HOST'),
      port: configService.get<number>('DATABASE_PORT'),
      username: 'postgres',
      password: '123456',
      database: configService.get<string>('DATABASE_NAME'),
      entities: [User],
      synchronize: true, // For development
    }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User]),

  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
