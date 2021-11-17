
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateCarMakeDTO } from '../dto/create-car-make.dto';

@Injectable()
export class CarMakeService {

  endpoint: string = '/api/car-makes';

  constructor(
    private readonly httpClient: HttpClient
  ) { }
  
  getAll(): any {
    return this.httpClient.get(this.endpoint);
  }
  
  create(dto: CreateCarMakeDTO): any {
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
