import { StockUpdateRepository } from './../repositories/stock-update.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { StockUpdateService } from './stock-update.service';

describe('StockUpdateService', () => {
  let service: StockUpdateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StockUpdateService, StockUpdateRepository],
    }).compile();

    service = module.get<StockUpdateService>(StockUpdateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
