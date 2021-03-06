import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateProductOrderDTO } from '../dto/create-product-order.dto';
import { UpdateProductOrderSimpleDTO } from '../dto/update-product-order-simple.dto';
import { UpdateProductOrderDTO } from '../dto/update-product-order.dto';

@Injectable()
export class ProductOrderService {

  endpoint: string = '/api/product-order';

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  getAll(): any {
    return this.httpClient.get(this.endpoint);
  }
  
  getAllByOrderId(orderId: number): any {
    const param: any = { orderId: orderId };
    return this.httpClient.get(this.endpoint, { params: param });
  }
  
  getOne(id: number): any {
    return this.httpClient.get(`${this.endpoint}/${id}`);
  }
   
  create(dto: CreateProductOrderDTO): any {
    return this.httpClient.post(`${this.endpoint}`, dto);
  }
  
  update(id: number, dto: UpdateProductOrderSimpleDTO): any {
    return this.httpClient.patch(`${this.endpoint}/${id}`, dto);
  }
  
  /*
  updateProcessing(id: number, dto: UpdateProductOrderDTO): any {
    return this.httpClient.patch(`${this.endpoint}/${id}/processing`, dto);
  }
  */
  
  delete(id: number): any {
    return this.httpClient.delete(`${this.endpoint}/${id}`);
  }

}
