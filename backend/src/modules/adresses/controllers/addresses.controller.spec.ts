import { AddressRepository } from './../repositories/address.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { AddressesController } from './addresses.controller';
import { AddressesService } from '../services/addresses.service';

describe('AdressesController', () => {
  let controller: AddressesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddressesController],
      providers: [AddressesService, AddressRepository],
    }).compile();

    controller = module.get<AddressesController>(AddressesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
