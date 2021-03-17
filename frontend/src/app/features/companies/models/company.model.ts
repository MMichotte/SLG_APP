import { ECompanyType } from './../enums/company-type.enum';
import { Address } from './../../../core/models/address.model';
import { Person } from '../../persons/models/person.model';

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
  person?: Person;
  address?: Address;

  constructor(obj?: any) {
    Object.assign(this, obj);
  }
}
