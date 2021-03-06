import { Test, TestingModule } from '@nestjs/testing';
import { StockUpdateController } from './stock-update.controller';
import { StockUpdateService } from '../services/stock-update.service';

describe('StockUpdateController', () => {
  let controller: StockUpdateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockUpdateController],
      providers: [StockUpdateService],
    }).compile();

    controller = module.get<StockUpdateController>(StockUpdateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
