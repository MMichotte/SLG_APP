import { Address } from '../../../core/models/address.model';
import { ECompanyType } from '../enums/company-type.enum';

export class CreateCompanyDTO {
  type: ECompanyType;
  name: string;
  email: string;
  VAT?: string;
  phone1?: string;
  phone2?: string;
  mobile?: string;
  website?: string;
  personId?: number;
  address?: Address;
}
