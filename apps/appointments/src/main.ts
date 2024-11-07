import { NestFactory } from '@nestjs/core';
import { AppointmentsModule } from './appointments.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppointmentsModule,
    {
      transport: Transport.TCP,
      options: { host: 'appointments', port: 3004 },
    },
  );
  await app.listen();
}
bootstrap();
