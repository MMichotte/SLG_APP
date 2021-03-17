import { UpdateCompanyDTO } from './../dto/update-company.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateCompanyDTO } from '../dto/create-company.dto';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  endpoint: string = '/api/companies';

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  getAll(): any {
    return this.httpClient.get(this.endpoint);
  }
  
  getOne(id: number): any {
    return this.httpClient.get(`${this.endpoint}/${id}`);
  }
  
  getAllClients(): any {
    return this.httpClient.get(`${this.endpoint}/clients`);
  }
  
  getAllSuppliers(): any {
    return this.httpClient.get(`${this.endpoint}/suppliers`);
  }
  
  create(client: CreateCompanyDTO): any {
    return this.httpClient.post(this.endpoint, client);
  }

  update(id: number, client: UpdateCompanyDTO): any {
    return this.httpClient.patch(`${this.endpoint}/${id}`, client);
  }
  
  delete(id: number): any {
    return this.httpClient.delete(`${this.endpoint}/${id}`);
  }
}
