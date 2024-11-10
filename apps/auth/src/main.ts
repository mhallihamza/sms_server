import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  // Create an application context to access ConfigService
  const appContext = await NestFactory.createApplicationContext(AuthModule);
  const configService = appContext.get(ConfigService);

  // Retrieve host and port from environment variables
  const host = '0.0.0.0';
  const port = configService.get<number>('AUTH_PORT', 3001); // Default to 3001

  // Create the microservice with dynamic host and port
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.TCP,
      options: { host, port },
    },
  );
  await app.listen();
}

bootstrap();
