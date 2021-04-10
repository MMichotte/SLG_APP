import { AddressRepository } from '@modules/adresses/repositories/address.repository';
import { AddressesService } from '@modules/adresses/services/addresses.service';
import { PersonRepository } from '../repositories/person.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { PersonsController } from './persons.controller';
import { PersonsService } from '../services/persons.service';

describe('PersonsController', () => {
  let controller: PersonsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonsController],
      providers: [PersonsService, PersonRepository, AddressesService, AddressRepository],
    }).compile();

    controller = module.get<PersonsController>(PersonsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
