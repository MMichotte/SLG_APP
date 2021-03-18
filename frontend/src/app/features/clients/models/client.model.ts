import { Company } from './../../companies/models/company.model';
import { ECompanyType } from './../../companies/enums/company-type.enum';
import { Person } from '../../persons/models/person.model';
import { ECivility } from '../../persons/enums/ECivility.enum';
import { Address } from '../../../core/models/address.model';

export class Client {

  // Client specific attributes
  child: Person | Company;
  isCompany: boolean;
  displayName: string;
  mainPhone: string;

  // Common attributes
  id?: number;
  email: string;
  mobile?: string;
  VAT?: string;
  address?: Address;

  // Person specific attributes
  civility?: ECivility;
  firstName?: string;
  lastName?: string;
  phone?: string;
  
  // Company specific attributes
  type?: ECompanyType;
  name?: string;
  phone1?: string;
  phone2?: string;
  website?: string;
  person?: Person;
  personId?: number;

  constructor(child: Person | Company) {
    this.child = child;
    this.isCompany = (child instanceof Company);
    
    this.id = child.id;
    this.email = child.email;
    this.mobile = child.mobile; 
    this.VAT = child.VAT;
    this.address = child.address;

    if (this.isCompany) {
      this.type = (<Company>child).type;
      this.name = (<Company>child).name;
      this.phone1 = (<Company>child).phone1;
      this.phone2 = (<Company>child).phone2;
      this.website = (<Company>child).website;
      this.person = (<Company>child).person;
      this.personId = (<Company>child).person?.id;

      this.displayName = this.name;
      this.mainPhone = this.phone1;
    } else {
      this.civility = (<Person>child).civility;
      this.firstName = (<Person>child).firstName;
      this.lastName = (<Person>child).lastName;
      this.phone = (<Person>child).phone;

      this.displayName = `${this.lastName} ${this.firstName}`;
      this.mainPhone = this.phone;
    }
  }

}
