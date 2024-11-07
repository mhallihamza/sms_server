import { Body, Controller, Post, Get, Param, Delete } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Controller('customers')
export class CustomersController {
    constructor(private customersService: CustomersService) {}
    @Post()
    async createCustomer(@Body() createCustomerDto: CreateCustomerDto):Promise<string> {
        return this.customersService.createCustomer(createCustomerDto)
    }

    @Get(':id')
    async getAllCustomers(@Param('id') id: string) {
        return this.customersService.getAllCustomers(id)
    }

    @Delete(':id')
    async deleteCustomer(@Param('id') id: string) {
        return this.customersService.deleteCustomer(id)
    }
}
