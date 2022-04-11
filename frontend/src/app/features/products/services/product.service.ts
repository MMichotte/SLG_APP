import { CreateStockUpdateDTO } from './../dto/create-stock-update.dto';
import { CreateProductDTO } from './../dto/create-product.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UpdateProductDTO } from '../dto/update-product.dto';
import { BrowserCacheService } from '@core/services/browser-cache.service';

@Injectable()
export class ProductService {

  endpoint: string = '/api/products';

  constructor (
    private readonly httpClient: HttpClient,
    private readonly browserCacheService: BrowserCacheService
  ) { }

  async getAll (): Promise<any> {
    const useCache = !(await this.getDataWasUpdated());
    return this.browserCacheService.getOrSetCache('products', useCache, async () => {
      return this.httpClient.get(this.endpoint).toPromise();
    });
  }

  async getDataWasUpdated (): Promise<any> {
    return this.httpClient.get(`${this.endpoint}/data-was-updated`).toPromise();
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
  
  getAllReceivedProductOrders(id: number): any {
    return this.httpClient.get(`/api/product-order/received/${id}`);
  }
  
  createStockUpdate(id:number, dto: CreateStockUpdateDTO): any {
    return this.httpClient.post(`${this.endpoint}/${id}/stock-updates`, dto);
  }
}
