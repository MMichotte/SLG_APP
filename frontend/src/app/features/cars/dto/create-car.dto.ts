import { EFuelType } from '../enums/fuel-type.enum';

export class CreateCarDTO {
  
  personId?: number;
  companyId?: number;
  modelId: number;
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
  
  constructor (car: CreateCarDTO) {
    for (const [key, value] of Object.entries(car)) {
      this[key] = value;
    }
  }

  equals(other: CreateCarDTO): boolean {
    for (const [key, value] of Object.entries(this)) {
      if (other[key] !== value) return false;
    }
    return true;
  };

}
