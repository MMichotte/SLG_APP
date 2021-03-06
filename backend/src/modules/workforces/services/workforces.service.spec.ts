import { Test, TestingModule } from '@nestjs/testing';
import { WorkforcesService } from './workforces.service';

describe('WorkforcesService', () => {
  let service: WorkforcesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkforcesService],
    }).compile();

    service = module.get<WorkforcesService>(WorkforcesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
