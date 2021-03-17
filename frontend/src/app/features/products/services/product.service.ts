import { CreateStockUpdateDTO } from './../dto/create-stock-update.dto';
import { CreateProductDTO } from './../dto/create-product.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UpdateProductDTO } from '../dto/update-product.dto';

@Injectable()
export class ProductService {

  endpoint: string = '/api/products';

  constructor (
    private readonly httpClient: HttpClient
  ) { }

  getAll (): any {
    return this.httpClient.get(this.endpoint);
  }
  
  getOne (id: number): any {
    return this.httpClient.get(`${this.endpoint}/${id}`);
  }

  create (product: CreateProductDTO): any {
    return this.httpClient.post(this.endpoint, product);
  }

  update (prodId: number, product: UpdateProductDTO): any {
    return this.httpClient.patch(`${this.endpoint}/${prodId}`, product);
  }

  delete (id: number): any {
    return this.httpClient.delete(`${this.endpoint}/${id}`);
  }

  getAllStockUpdates(id: number): any {
    return this.httpClient.get(`${this.endpoint}/${id}/stock-updates`);
  }
  
  createStockUpdate(id:number, dto: CreateStockUpdateDTO): any {
    return this.httpClient.post(`${this.endpoint}/${id}/stock-updates`, dto);
  }
}
