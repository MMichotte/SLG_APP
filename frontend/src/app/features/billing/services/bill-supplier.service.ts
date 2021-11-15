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

  getAllBySupplierID(supplierId: number): any {
    return this.httpClient.get(`${this.endpoint}/supplier/${supplierId}`);
  }

  getOne(id: number): any {
    return this.httpClient.get(`${this.endpoint}/${id}`);
  }

  downloadPdf(id: number): any {
    return this.httpClient.get(`${this.endpoint}/${id}/download/pdf`, { observe: 'response', responseType: 'arraybuffer' });
  }

  create(dto: CreateBillSupplierDTO, orderId: number): any {
    return this.httpClient.post(`${this.endpoint}`, dto, { params: { orderId: orderId.toString() } });
  }

}
