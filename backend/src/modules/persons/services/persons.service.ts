import { Injectable } from '@nestjs/common';
import { Not } from 'typeorm';
import { UpdatePersonDTO } from '../dto/update-person.dto';
import { CreatePersonDTO } from '../dto/create-person.dto';
import { PersonRepository } from '../repositories/person.repository';
import { Person } from '../entities/person.entity';
import { RedisService } from '@core/services/redis.service';

@Injectable()
export class PersonsService {

  constructor(
    private readonly personRepository: PersonRepository,
    private readonly redisService: RedisService
  ) {}

  findAll(): Promise<Person[]> {
    return this.redisService.getOrSetCache('persons', () => {
      return this.personRepository.find({relations: ['address']});  
    });
  }
  
  findAllLight(): Promise<Person[]> {
    return this.redisService.getOrSetCache('light-persons', () => {
      return this.personRepository.find({select: ['id', 'firstName', 'lastName']});  
    });
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
    this.resetCache();
    return this.personRepository.save(person); 
  }
  
  update(id: number, person: UpdatePersonDTO): Promise<any> {
    this.resetCache();
    return this.personRepository.update(id, person); 
  }

  remove(id: number) {
    this.resetCache();
    return this.personRepository.delete(id);
  }

  private resetCache() {
    this.redisService.resetCache('persons');
    this.redisService.resetCache('light-persons');
  }
}
