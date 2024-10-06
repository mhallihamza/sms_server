import { Controller } from '@nestjs/common';
import { Post, Get, Body, Param } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Controller('appointments')
export class AppointmentsController {
    constructor(private appointmentsService: AppointmentsService) {}
    @Post()
    async createCustomer(@Body() createAppointmentDto: CreateAppointmentDto):Promise<string> {
        return this.appointmentsService.createAppointment(createAppointmentDto)
    }

    @Get(':id')
    async getAllCustomers(@Param('id') id: string) {
        return this.appointmentsService.getAllAppointments(id)
    }
}
