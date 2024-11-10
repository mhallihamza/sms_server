import { NestFactory } from '@nestjs/core';
import { CustomersModule } from './customers.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  // Create application context to access ConfigService
  const appContext =
    await NestFactory.createApplicationContext(CustomersModule);
  const configService = appContext.get(ConfigService);

  // Set up microservice with env-based host and port
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CustomersModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: configService.get<number>('CUSTOMERS_PORT', 3003), // Default to 3003 if not set
      },
    },
  );
  await app.listen();
}

bootstrap();
