import { CreateBillSupplierDTO } from './../dto/create-bill-supplier.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class BillSupplierService {

  endpoint: string = '/api/bill-supplier';

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  getAll(): any {
    return this.httpClient.get(this.endpoint);
  }
  
  getOne(id: number): any {
    return this.httpClient.get(`${this.endpoint}/${id}`);
  }
   
  create(dto: CreateBillSupplierDTO): any {
    return this.httpClient.post(`${this.endpoint}`, dto);
  }

}
