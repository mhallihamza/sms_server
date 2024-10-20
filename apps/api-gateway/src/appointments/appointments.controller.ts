import { Controller } from '@nestjs/common';
import { Post, Get, Body, Param, Delete } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Controller('appointments')
export class AppointmentsController {
    constructor(private appointmentsService: AppointmentsService) {}
    @Post()
    async createAppointment(@Body() createAppointmentDto: CreateAppointmentDto):Promise<string> {
        return this.appointmentsService.createAppointment(createAppointmentDto)
    }

    @Get(':id')
    async getAllAppointment(@Param('id') id: string) {
        return this.appointmentsService.getAllAppointments(id)
    }

    @Get('details/:id')
    async findAllAppointmentsDetails(@Param('id') id: string) {
        return this.appointmentsService.findAllAppointmentsDetails(id);
    }

    @Delete(':id')
    async deleteAppointment(@Param('id') id: string) {
        return this.appointmentsService.deleteAppointment(id)
    }
}
