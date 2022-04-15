import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BrowserCacheService } from '@core/services/browser-cache.service';
import { CreatePersonDTO } from '../dto/create-person.dto';
import { UpdatePersonDTO } from '../dto/update-person.dto';

@Injectable({
  providedIn: 'root'
})
export class PersonsService {

  endpoint: string = '/api/persons';

  constructor(
    private readonly httpClient: HttpClient,
    private readonly browserCacheService: BrowserCacheService
  ) { }

  getAll(): any {
    return this.browserCacheService.getOrSetCache(this.endpoint, async () => {
      return this.httpClient.get(this.endpoint).toPromise();
    });
  }
  
  getAllOwnersLight(): any {
    return this.httpClient.get(`${this.endpoint}/owners-light`);
  }
  
  getOne(id: number): any {
    return this.httpClient.get(`${this.endpoint}/${id}`);
  }

  create(client: CreatePersonDTO): any {
    return this.httpClient.post(this.endpoint, client);
  }

  update(id: number, client: UpdatePersonDTO): any {
    return this.httpClient.patch(`${this.endpoint}/${id}`, client);
  }
  
  delete(id: number): any {
    return this.httpClient.delete(`${this.endpoint}/${id}`);
  }
}
