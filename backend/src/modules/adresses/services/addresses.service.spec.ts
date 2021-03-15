import { AddressRepository } from './../repositories/address.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { AddressesService } from './addresses.service';

describe('AddressesService', () => {
  let service: AddressesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddressesService, AddressRepository],
    }).compile();

    service = module.get<AddressesService>(AddressesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
