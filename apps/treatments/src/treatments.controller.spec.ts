import { Test, TestingModule } from '@nestjs/testing';
import { TreatmentsController } from './treatments.controller';
import { TreatmentsService } from './treatments.service';

describe('TreatmentsController', () => {
  let treatmentsController: TreatmentsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TreatmentsController],
      providers: [TreatmentsService],
    }).compile();

    treatmentsController = app.get<TreatmentsController>(TreatmentsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(treatmentsController.getHello()).toBe('Hello World!');
    });
  });
});
