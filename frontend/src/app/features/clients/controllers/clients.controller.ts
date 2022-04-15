import { Injectable } from '@angular/core';
import { Client } from './../models/client.model';
import { Person } from '@features/persons/models/person.model';
import { PersonsService } from '@features/persons/services/persons.service';
import { CreatePersonDTO } from '@features/persons/dto/create-person.dto';
import { UpdatePersonDTO } from '@features/persons/dto/update-person.dto';
import { Company } from '@features/companies/models/company.model';
import { CompaniesService } from '@features/companies/services/companies.service';
import { CreateCompanyDTO } from '@features/companies/dto/create-company.dto';
import { UpdateCompanyDTO } from '@features/companies/dto/update-company.dto';

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
    
    // TODO handle errors 
    let persons: Person[] = null;
    let companies: Company[] = null;
    [persons, companies] = await Promise.all([
      this.personsService.getAll(),
      this.companiesService.getAllClients().toPromise()
    ]);
    
    persons.forEach(
      (p: Person) => {
        clients.push(new Client(new Person(p)));
      }
    );
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
