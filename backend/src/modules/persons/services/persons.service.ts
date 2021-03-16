import { Injectable } from '@nestjs/common';
import { Not } from 'typeorm';
import { UpdatePersonDTO } from '../dto/update-person.dto';
import { CreatePersonDTO } from '../dto/create-person.dto';
import { PersonRepository } from '../repositories/person.repository';
import { Person } from '../entities/person.entity';

@Injectable()
export class PersonsService {

  constructor(
    private readonly personRepository: PersonRepository
  ) {}

  findAll(): Promise<Person[]> {
    return this.personRepository.find({relations: ['address']});  
  }

  findOneById(id: number): Promise<Person> {
    return this.personRepository.findOne({ where: { id }, relations: ['address'] });
  }

  findOneByEmail(email: string): Promise<Person> {
    return this.personRepository.findOne({ where: { email }, relations: ['address'] });
  }
  
  findOtherByEmail(myId: number, email: string): Promise<Person> {
    return this.personRepository.findOne({ where: { email, id: Not(myId) }, relations: ['address'] });
  }

  create(person: CreatePersonDTO): Promise<Person> {
    return this.personRepository.save(person); 
  }
  
  update(id: number, person: UpdatePersonDTO): Promise<any> {
    return this.personRepository.update(id, person); 
  }

  remove(id: number) {
    return this.personRepository.delete(id);
  }
}
