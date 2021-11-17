
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateCarDTO } from '../dto/create-car.dto';
import { UpdateCarDTO } from '../dto/update-car.dto';

@Injectable()
export class CarService {

  endpoint: string = '/api/cars';

  constructor(
    private readonly httpClient: HttpClient
  ) { }
  
  getAll(): any {
    return this.httpClient.get(this.endpoint);
  }
  
  getAllModels(): any {
    return this.httpClient.get('/api/car-models');
  }

  create(dto: CreateCarDTO): any {
    return this.httpClient.post(`${this.endpoint}`, dto);
  }

  update(id: number, dto: UpdateCarDTO): any {
    return this.httpClient.patch(`${this.endpoint}/${id}`, dto);
  }

  delete(id: number): any {
    return this.httpClient.delete(`${this.endpoint}/${id}`);
  }
  
}
