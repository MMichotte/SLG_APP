import { EOrderStatus } from './../enums/order-status.enum';
import { UpdateOrderDTO } from './../dto/update-order.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateOrderDTO } from '../dto/create-order.dto';

@Injectable()
export class OrderService {

  endpoint: string = '/api/orders';

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  getAll(): any {
    return this.httpClient.get(this.endpoint);
  }
  
  getAllByStatus(status: EOrderStatus): any {
    return this.httpClient.get(this.endpoint, { params: { status: status } });
  }
  
  getOne(id: number): any {
    return this.httpClient.get(`${this.endpoint}/${id}`);
  }
   
  create(dto: CreateOrderDTO): any {
    return this.httpClient.post(`${this.endpoint}`, dto);
  }
  
  update(id: number, dto: UpdateOrderDTO): any {
    return this.httpClient.patch(`${this.endpoint}/${id}`, dto);
  }
  
  delete(id: number): any {
    return this.httpClient.delete(`${this.endpoint}/${id}`);
  }

  downloadPdf(id: number): any {
    return this.httpClient.get(`${this.endpoint}/${id}/download/pdf`, { observe: 'response', responseType: 'arraybuffer' });
  }
  
  // ------- //
  getAllLightProducts(search?: string): any {
    if (search) return this.httpClient.get('/api/products/light', { params: { searchProduct: search } });
    return this.httpClient.get('/api/products/light');
  }

}
