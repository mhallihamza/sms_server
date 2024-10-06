import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CUSTOMER_SERVICE',
        transport: Transport.TCP,
        options: { host: 'localhost', port: 3003 },
      },
    ]),
  ],
  providers: [CustomersService],
  controllers: [CustomersController]
})
export class CustomersModule {}
