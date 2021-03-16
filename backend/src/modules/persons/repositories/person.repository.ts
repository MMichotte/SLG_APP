import { Repository } from 'typeorm';
import { Person } from '../entities/person.entity';

export class PersonRepository extends Repository<Person> {
  
}