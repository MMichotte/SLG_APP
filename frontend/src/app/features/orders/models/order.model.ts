import { EOrderStatus } from './../enums/order-status.enum';
import { Company } from './../../companies/models/company.model';

export class Order {
  id: number;
  supplier: Company;
  supplierName?: string;
  status: EOrderStatus;
  createdAt: Date | string;
  updatedAt: Date | string;
}
