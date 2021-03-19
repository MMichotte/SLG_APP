import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class OrderService {

  endpoint: string = '/api/orders';

  constructor (
    private readonly httpClient: HttpClient
  ) { }

  getAll (): any {
    return this.httpClient.get(this.endpoint);
  }
}
