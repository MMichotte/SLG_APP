import { Test, TestingModule } from '@nestjs/testing';
import { WorkforcesController } from './workforces.controller';
import { WorkforcesService } from '../services/workforces.service';
import { WorkforceRepository } from '../repositories/workforce.repository';

describe('WorkforcesController', () => {
  let controller: WorkforcesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkforcesController],
      providers: [
        WorkforcesService,
        WorkforceRepository
      ],
    }).compile();

    controller = module.get<WorkforcesController>(WorkforcesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
