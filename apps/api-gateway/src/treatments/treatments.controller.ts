import { Controller, Post, Get, Body, Param, Delete } from '@nestjs/common';
import { TreatmentsService } from './treatments.service';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
@Controller('treatments')
export class TreatmentsController {
  constructor(private treatmentsService: TreatmentsService) {}
  @Post()
  async createTreatment(
    @Body() createTreatmentDto: CreateTreatmentDto,
  ): Promise<string> {
    return this.treatmentsService.createTreatment(createTreatmentDto);
  }

  @Get(':id')
  async getAllTreatments(@Param('id') id: string) {
    return this.treatmentsService.getAllTreatments(id);
  }

  @Delete(':id')
  async deleteTreatment(@Param('id') id: string) {
    return this.treatmentsService.deleteTreatment(id);
  }
}
