import { Company } from '@features/companies/models/company.model';
import { Person } from '@features/persons/models/person.model';
import { EFuelType } from '../enums/fuel-type.enum';
import { CarModel } from './car-model.model';

export class Car {
  id: number;
  person?: Person;
  company?: Company;
  model: CarModel;
  version?: string;
  color?: string;
  fuelType?: EFuelType;
  bodywork?: string;
  registrationNumber?: string;
  chassisNumber: string;
  chassisNumberLocation?: string;
  engineDisplacement?: number;
  engineNumber?: string;
  gearboxType?: string;
  firstRegistration?: Date | string;
  note?: string;
  createdAt: Date | string;
  updatedAt: Date | string;

  owner?: string;
  makeLabel?: string;
  modelLabel?: string;
}
