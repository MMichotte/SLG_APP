import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateWorkforceDTO } from '../dto/create-workforce.dto';
import { UpdateWorkforceDTO } from '../dto/update-workforce.dto';

@Injectable({
  providedIn: 'root'
})
export class WorkforceService {

  endpoint: string = '/api/workforces';

  constructor (
    private readonly httpClient: HttpClient
  ) { }

  getAll (): any {
    return this.httpClient.get(this.endpoint);
  }

  create (workforce: CreateWorkforceDTO): any {
    return this.httpClient.post(this.endpoint, workforce);
  }

  update (id: number, workforce: UpdateWorkforceDTO): any {
    return this.httpClient.patch(`${this.endpoint}/${id}`, workforce);
  }

  delete (id: number): any {
    return this.httpClient.delete(`${this.endpoint}/${id}`);
  }
}
