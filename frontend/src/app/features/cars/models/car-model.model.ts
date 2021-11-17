import { CarMake } from './car-make.model';

export class CarModel {
  id: number;
  label: string;
  carMake: CarMake;
  createdAt: Date | string;
  updatedAt: Date | string;
  displayName?: string; 
}
