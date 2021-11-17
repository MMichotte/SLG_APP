
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateCarModelDTO } from '../dto/create-car-model.dto';

@Injectable()
export class CarModelService {

  endpoint: string = '/api/car-models';

  constructor(
    private readonly httpClient: HttpClient
  ) { }
  
  getAll(): any {
    return this.httpClient.get(this.endpoint);
  }
  
  create(dto: CreateCarModelDTO): any {
    return this.httpClient.post(`${this.endpoint}`, dto);
  }
  
  /*
  update(id: number, dto: UpdateCarDTO): any {
    return this.httpClient.patch(`${this.endpoint}/${id}`, dto);
  }
  */
  delete(id: number): any {
    return this.httpClient.delete(`${this.endpoint}/${id}`);
  }
  
}
