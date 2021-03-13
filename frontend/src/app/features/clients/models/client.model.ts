import { Address } from './../../../core/models/address.model';
import { ECivility } from '../enums/ECivility.enum';

export class Client {
  id: number;
  civility: ECivility;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  mobile?: string;
  address?: Address;
}
