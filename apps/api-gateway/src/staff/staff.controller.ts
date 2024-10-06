import { Body, Param,Post, Get } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { StaffService } from './staff.service';
import { CreateStaffDto } from './dto/create-staff.dto';
@Controller('staff')
export class StaffController {
    constructor(private staffService: StaffService) {}
    @Post()
    async createStaff(@Body() createCustomerDto: CreateStaffDto):Promise<string> {
        return this.staffService.createStaff(createCustomerDto)
    }

    @Get(':id')
    async getAllStaff(@Param('id') id: string) {
        return this.staffService.getAllStaff(id)
    }
}
