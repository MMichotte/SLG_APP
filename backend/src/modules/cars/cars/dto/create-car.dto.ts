import { CarModel } from '@modules/cars/car-models/entities/car-model.entity';
import { Company } from '@modules/companies/entities/company.entity';
import { Person } from '@modules/persons/entities/person.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { EFuelType } from '../enums/EFuelType.enum';
import { CarDTO } from './car.dto';

export class CreateCarDTO {
  
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
  @IsNumber()
  @IsNotEmpty()
  modelId: number
  model?: CarModel

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  version?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  color?: string;

  @ApiPropertyOptional({enum: EFuelType})
  @IsEnum(EFuelType)
  @IsOptional()
  fuelType?: EFuelType;
  
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  bodywork?: string;
  
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  registrationNumber?: string;

  @ApiProperty()
  @IsString()
  chassisNumber: string;
  
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  chassisNumberLocation?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  engineDisplacement?: number;
  
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  engineNumber?: string;
  
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  gearboxType?: string;

  @ApiPropertyOptional()
  @IsDate()
  @IsOptional()
  firstRegistration?: Date;

  
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  note?: string;

  constructor(obj?: CarDTO) {
    Object.assign(this, obj);
  }
  
  createdAt?: Date = new Date();
  updatedAt?: Date = new Date();
  
}
