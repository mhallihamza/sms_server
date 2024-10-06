import { NestFactory } from '@nestjs/core';
import { StaffModule } from './staff.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    StaffModule,
    {
      transport: Transport.TCP,
      options: { host: 'localhost', port: 3005 },
    },
  );
  await app.listen();
}
bootstrap();
