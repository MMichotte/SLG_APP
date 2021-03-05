import { CreateProductDTO } from './../dto/create-product.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UpdateProductDTO } from '../dto/update-product.dto';

@Injectable()
export class ProductService {

  constructor (
    private readonly httpClient: HttpClient
  ) { }

  getAll (): any {
    return this.httpClient.get('/api/products');
  }

  create (product: CreateProductDTO): any {
    return this.httpClient.post('/api/products', product);
  }

  update (prodId: number, product: UpdateProductDTO): any {
    return this.httpClient.patch(`/api/products/${prodId}`, product);
  }

  delete (id: number): any {
    return this.httpClient.delete(`/api/products/${id}`);
  }
}
