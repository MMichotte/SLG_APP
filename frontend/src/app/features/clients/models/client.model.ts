import { Address } from '../../../core/models/address.model';
import { Person } from '../../persons/models/person.model';
import { Company } from './../../companies/models/company.model';

export class Client {

  type: Person | Company;
  isCompany: boolean;
  name: string;
  email: string;
  phone?: string;
  mobile?: string;
  address?: Address;
  VAT?: string;

  constructor(type: Person | Company) {
    this.type = type;
    
    this.isCompany = (this.type instanceof Company);

    this.name = (this.type instanceof Person)
      ? `${(<Person>type).lastName} ${(<Person>type).firstName}`
      : (<Company>type).name;

    this.email = this.type.email;

    this.phone = (this.type instanceof Person)
      ? (<Person>type).phone
      : (<Company>type).phone1;

    this.mobile = this.type.mobile; 

    this.address = this.type.address;

    this.VAT = (this.type instanceof Person)
      ? null
      : (<Company>type).VAT;
  }

}
