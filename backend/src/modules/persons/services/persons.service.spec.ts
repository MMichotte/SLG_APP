import { PersonRepository } from '../repositories/person.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { PersonsService } from './persons.service';

describe('PersonService', () => {
  let service: PersonsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonsService, PersonRepository],
    }).compile();

    service = module.get<PersonsService>(PersonsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
