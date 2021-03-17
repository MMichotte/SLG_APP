import { ECompanyType } from './../enums/company-type.enum';
import { Address } from './../../../core/models/address.model';

export class Company {
  id: number;
  type: ECompanyType;
  name: string;
  email: string;
  VAT: string;
  phone1?: string;
  phone2?: string;
  mobile?: string;
  website?: string;
  address?: Address;

  constructor(obj?: any) {
    Object.assign(this, obj);
  }
}
