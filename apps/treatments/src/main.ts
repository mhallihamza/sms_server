import { NestFactory } from '@nestjs/core';
import { TreatmentsModule } from './treatments.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    TreatmentsModule,
    {
      transport: Transport.TCP,
      options: { host: 'localhost', port: 3007 },
    },
  );
  await app.listen();
}
bootstrap();
