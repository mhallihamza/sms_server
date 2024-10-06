import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
@Controller('services')
export class ServicesController {
    constructor(private servicesService: ServicesService) {}
    @Post()
    async createCustomer(@Body() createCustomerDto: CreateServiceDto):Promise<string> {
        return this.servicesService.createService(createCustomerDto)
    }

    @Get(':id')
    async getAllCustomers(@Param('id') id: string) {
        return this.servicesService.getAllServices(id)
    }
}
