import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CountriesService {

  endpoint: string = 'https://restcountries.eu/rest/v2';

  constructor (
    private readonly http: HttpClient
  ) {}

  getAll() {
    return this.http.get(`${this.endpoint}/all?fields=name;flag`);
  }

  getByName(partialName: string) {
    return this.http.get(`${this.endpoint}/name/${partialName}?fields=name;flag`);
  }

}
