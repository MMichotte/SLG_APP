import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateClientDTO } from '../dto/create-client.dto';
import { UpdateClientDTO } from '../dto/update-client.dto';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  endpoint: string = '/api/clients';

  constructor (
    private readonly httpClient: HttpClient
  ) { }

  getAll (): any {
    return this.httpClient.get(this.endpoint);
  }

  create (client: CreateClientDTO): any {
    return this.httpClient.post(this.endpoint, client);
  }

  update (id: number, client: UpdateClientDTO): any {
    return this.httpClient.patch(`${this.endpoint}/${id}`, client);
  }
  
  delete (id: number): any {
    return this.httpClient.delete(`${this.endpoint}/${id}`);
  }
}
