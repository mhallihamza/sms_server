import { NestFactory } from '@nestjs/core';
import { ServicesModule } from './services.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(ServicesModule);
  const configService = appContext.get(ConfigService);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ServicesModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0', // Defaults to localhost if not specified
        port: configService.get<number>('SERVICES_PORT', 3006), // Defaults to 3006 if not specified
      },
    },
  );
  await app.listen();
}

bootstrap();
