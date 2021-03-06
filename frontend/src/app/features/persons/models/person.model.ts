import { Address } from '@core/models/address.model';
import { ECivility } from '../enums/ECivility.enum';

export class Person {
  id: number;
  civility: ECivility;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  mobile?: string;
  VAT?: string;
  address?: Address;

  constructor(obj?: Person) {
    Object.assign(this, obj);
  }
}
