import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthUser } from './auth-user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:'./apps/auth/.env'
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
      entities: [AuthUser],
      synchronize: true, // For development
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([AuthUser]),
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: { host: 'localhost', port: 3002 },
      },
    ])
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
