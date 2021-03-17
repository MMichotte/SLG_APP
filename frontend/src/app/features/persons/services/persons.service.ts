import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreatePersonDTO } from '../dto/create-person.dto';
import { UpdatePersonDTO } from '../dto/update-person.dto';

@Injectable({
  providedIn: 'root'
})
export class PersonsService {

  endpoint: string = '/api/persons';

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  getAll(): any {
    return this.httpClient.get(this.endpoint);
  }
  
  getOne(id: number): any {
    return this.httpClient.get(`${this.endpoint}/${id}`);
  }

  create(client: CreatePersonDTO): any {
    return this.httpClient.post(this.endpoint, client);
  }

  update(id: number, client: UpdatePersonDTO): any {
    return this.httpClient.patch(`${this.endpoint}/${id}`, client);
  }
  
  delete(id: number): any {
    return this.httpClient.delete(`${this.endpoint}/${id}`);
  }
}
