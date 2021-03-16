import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
  /*
  create(client: CreatePersonDTO): any {
    return this.httpClient.post(this.endpoint, client);
  }

  update(id: number, client: UpdatePersonDTO): any {
    return this.httpClient.patch(`${this.endpoint}/${id}`, client);
  }
  */
 
  delete(id: number): any {
    return this.httpClient.delete(`${this.endpoint}/${id}`);
  }
}
