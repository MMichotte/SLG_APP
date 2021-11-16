import { CompanyDTO } from '@modules/companies/dto/company.dto';
import { PersonDTO } from '@modules/persons/dto/person.dto';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CarModelDTO } from '@modules/cars/car-models/dto/car-model.dto';
import { EFuelType } from '../enums/EFuelType.enum';

@Exclude()
export class CarDTO {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiPropertyOptional({type: PersonDTO})
  person: PersonDTO
  
  @Expose()
  @ApiPropertyOptional({type: CompanyDTO})
  company: CompanyDTO
  
  @Expose()
  @ApiProperty({type: CarModelDTO})
  model: CarModelDTO

  @Expose()
  @ApiPropertyOptional()
  version?: string;

  @Expose()
  @ApiPropertyOptional()
  color?: string;

  @Expose()
  @ApiPropertyOptional({enum: EFuelType})
  fuelType?: EFuelType;

  @Expose()
  @ApiPropertyOptional()
  bodywork?: string;

  @Expose()
  @ApiPropertyOptional()
  registrationNumber?: string;

  @Expose()
  @ApiProperty()
  chassisNumber: string;

  @Expose()
  @ApiPropertyOptional()
  chassisNumberLocation?: string;

  @Expose()
  @ApiPropertyOptional()
  engineDisplacement?: number;

  @Expose()
  @ApiPropertyOptional()
  engineNumber?: string;

  @Expose()
  @ApiPropertyOptional()
  gearboxType?: string;

  @Expose()
  @ApiPropertyOptional()
  firstRegistration?: Date;

  @Expose()
  @ApiPropertyOptional()
  note?: string;

  constructor(obj?: CarDTO) {
    Object.assign(this, obj);
  }

}
