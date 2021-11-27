import { Exclude, Expose } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CarDTO } from '@modules/cars/cars/dto/car.dto';
import { CompanyDTO } from '@modules/companies/dto/company.dto';
import { PersonDTO } from '@modules/persons/dto/person.dto';

@Exclude()
export class WorksheetDTO {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiPropertyOptional({type: CarDTO})
  car?: CarDTO;
  
  @Expose()
  @ApiPropertyOptional({type: PersonDTO})
  person?: PersonDTO;
  
  @Expose()
  @ApiPropertyOptional({type: CompanyDTO})
  company?: CompanyDTO;
  
  @Expose()
  @ApiProperty()
  isActive: boolean;

  constructor(obj?: WorksheetDTO) {
    Object.assign(this, obj);
  }
}
