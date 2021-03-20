import { UpdateOrderDTO } from './../dto/update-order.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateOrderDTO } from '../dto/create-order.dto';
import { CreateProductOrderDTO } from '../dto/create-product-order.dto';
import { UpdateProductOrderDTO } from '../dto/update-product-order.dto';

@Injectable()
export class OrderService {

  endpoint: string = '/api/orders';

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  getAll(): any {
    return this.httpClient.get(this.endpoint);
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
  
  // ------- //
  
  getAllProductsByOrderId(id: number): any {
    return this.httpClient.get(`${this.endpoint}/${id}/products`);
  }

  addProduct(id:number, dto: CreateProductOrderDTO): any {
    return this.httpClient.post(`${this.endpoint}/${id}/products`, dto);
  }
  
  updateProduct(id:number, prodId: number, dto: UpdateProductOrderDTO): any {
    return this.httpClient.patch(`${this.endpoint}/${id}/products/${prodId}`, dto);
  }
  
  removeProduct(id:number, prodId: number): any {
    return this.httpClient.delete(`${this.endpoint}/${id}/products/${prodId}`);
  }

  // ------- //
  getAllLightProducts(search?: string): any {
    if (search) return this.httpClient.get('/api/products/light', { params: { searchProduct: search } });
    return this.httpClient.get('/api/products/light');
  }

}
