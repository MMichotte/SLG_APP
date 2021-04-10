import { PersonRepository } from '@modules/persons/repositories/person.repository';
import { PersonsService } from '@modules/persons/services/persons.service';
import { CompanyRepository } from './../repositories/company.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from '../services/companies.service';
import { AddressRepository } from '@modules/adresses/repositories/address.repository';
import { AddressesService } from '@modules/adresses/services/addresses.service';

describe('CompaniesController', () => {
  let controller: CompaniesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesController],
      providers: [CompaniesService, CompanyRepository, PersonsService, PersonRepository, AddressesService, AddressRepository],
    }).compile();

    controller = module.get<CompaniesController>(CompaniesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
