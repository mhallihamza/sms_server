import { NestFactory } from '@nestjs/core';
import { StaffModule } from './staff.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(StaffModule);
  const configService = appContext.get(ConfigService);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    StaffModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: configService.get<number>('STAFF_PORT', 3005), // Default to 3005 if not specified
      },
    },
  );
  await app.listen();
}

bootstrap();
