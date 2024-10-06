import { NestFactory } from '@nestjs/core';
import { CustomersModule } from './customers.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CustomersModule,
    {
      transport: Transport.TCP,
      options: { host: 'localhost', port: 3003 },
    },
  );
  await app.listen();
}
bootstrap();
