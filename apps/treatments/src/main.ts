import { NestFactory } from '@nestjs/core';
import { TreatmentsModule } from './treatments.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const appContext =
    await NestFactory.createApplicationContext(TreatmentsModule);
  const configService = appContext.get(ConfigService);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    TreatmentsModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: configService.get<number>('TREATMENTS_PORT', 3007), // Default to 3007 if not set
      },
    },
  );
  await app.listen();
}

bootstrap();
