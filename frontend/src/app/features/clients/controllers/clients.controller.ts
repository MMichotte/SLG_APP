import { UpdatePersonDTO } from './../../persons/dto/update-person.dto';
import { CreatePersonDTO } from './../../persons/dto/create-person.dto';
import { Injectable } from '@angular/core';
import { Client } from './../models/client.model';
import { Person } from '../../persons/models/person.model';
import { PersonsService } from '../../persons/services/persons.service';
import { Company } from '../../companies/models/company.model';
import { CompaniesService } from '../../companies/services/companies.service';

@Injectable({
  providedIn: 'root'
})
export class ClientsController {

  constructor (
    private readonly personsService: PersonsService,
    private readonly companiesService: CompaniesService
  ) { }

  async getAll(): Promise<Client[]> {
    const clients: Client[] = [];
    
    // TODO handle error in toPromise! 
    const persons: Person[] = await this.personsService.getAll().toPromise();
    persons.forEach(
      (p: Person) => {
        clients.push(new Client(new Person(p)));
      }
    );

    const companies: Company[] = await this.companiesService.getAll().toPromise();
    companies.forEach(
      (c: Company) => {
        clients.push(new Client(new Company(c)));
      }
    );

    return clients;
  }

  createPerson(dto: CreatePersonDTO): any {
    return this.personsService.create(dto);
  }
  
  updatePerson(id: number, dto: UpdatePersonDTO): any {
    return this.personsService.update(id, dto);
  }
  
  delete (client: Client): any {
    if (client.type instanceof Person) {
      return this.personsService.delete(client.type.id);
    }
    return this.companiesService.delete(client.type.id);
  }
  
}
