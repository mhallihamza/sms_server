import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CustomersModule } from './customers/customers.module';
import { StaffModule } from './staff/staff.module';
import { ServicesModule } from './services/services.module';
import { TreatmentsModule } from './treatments/treatments.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [AuthModule, UsersModule, CustomersModule, StaffModule, ServicesModule, TreatmentsModule, AppointmentsModule, PaymentsModule],
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService],
})
export class ApiGatewayModule {}
