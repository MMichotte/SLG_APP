import { UpdateCompanyDTO } from './../dto/update-company.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateCompanyDTO } from '../dto/create-company.dto';
import { BrowserCacheService } from '@core/services/browser-cache.service';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  endpoint: string = '/api/companies';

  constructor(
    private readonly httpClient: HttpClient,
    private readonly browserCacheService: BrowserCacheService
  ) { }

  getAll(): any {
    return this.browserCacheService.getOrSetCache(this.endpoint, async () => {
      return this.httpClient.get(this.endpoint).toPromise();
    });
  }
  
  getOne(id: number): any {
    return this.httpClient.get(`${this.endpoint}/${id}`);
  }
  
  getAllClients(): any {
    return this.httpClient.get(`${this.endpoint}/clients`);
  }

  getAllClientsOwnersLight(): any {
    return this.httpClient.get(`${this.endpoint}/clients/owners-light`);
  }
  
  getAllSuppliers(): any {
    return this.httpClient.get(`${this.endpoint}/suppliers`);
  }
  
  getAllLightSuppliers(): any {
    return this.httpClient.get(`${this.endpoint}/suppliers-light`);
  }
  
  create(client: CreateCompanyDTO): any {
    return this.httpClient.post(this.endpoint, client);
  }

  update(id: number, client: UpdateCompanyDTO): any {
    return this.httpClient.patch(`${this.endpoint}/${id}`, client);
  }
  
  delete(id: number): any {
    return this.httpClient.delete(`${this.endpoint}/${id}`);
  }
}
