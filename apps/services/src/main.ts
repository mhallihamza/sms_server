import { NestFactory } from '@nestjs/core';
import { ServicesModule } from './services.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ServicesModule,
    {
      transport: Transport.TCP,
      options: { host: 'services', port: 3006 },
    },
  );
  await app.listen();
}
bootstrap();
