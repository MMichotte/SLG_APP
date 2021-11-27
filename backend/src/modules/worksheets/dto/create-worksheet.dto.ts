import { Car } from '@modules/cars/cars/entities/car.entity';
import { Company } from '@modules/companies/entities/company.entity';
import { Person } from '@modules/persons/entities/person.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional} from 'class-validator';

export class CreateWorksheetDTO {

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  carId?: number;
  car?: Car;
  
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  personId?: number;
  person?: Person;
  
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  companyId?: number;
  company?: Company;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;

  createdAt?: Date = new Date();
  updatedAt?: Date = new Date();

  constructor(obj?: CreateWorksheetDTO) {
    Object.assign(this, obj);
  }
}
