import { Injectable } from '@angular/core';
import { Client } from './../models/client.model';
import { Person } from '../../persons/models/person.model';
import { PersonsService } from '../../persons/services/persons.service';
import { CreatePersonDTO } from './../../persons/dto/create-person.dto';
import { UpdatePersonDTO } from './../../persons/dto/update-person.dto';
import { Company } from '../../companies/models/company.model';
import { CompaniesService } from '../../companies/services/companies.service';
import { CreateCompanyDTO } from '../../companies/dto/create-company.dto';
import { UpdateCompanyDTO } from './../../companies/dto/update-company.dto';

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

    const companies: Company[] = await this.companiesService.getAllClients().toPromise();
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

  createCompany(dto: CreateCompanyDTO): any {
    return this.companiesService.create(dto);
  }
  
  updateCompany(id: number, dto: UpdateCompanyDTO): any {
    return this.companiesService.update(id, dto);
  }
  
  delete (client: Client): any {
    if (!client.isCompany) {
      return this.personsService.delete(client.id);
    }
    return this.companiesService.delete(client.id);
  }
  
}
