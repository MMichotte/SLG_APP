import { ECompanyType } from '../enums/company-type.enum';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { PersonDTO } from '../../persons/dto/person.dto';
import { AddressDTO } from '../../adresses/dto/address.dto';

@Exclude()
export class LightCompanyDTO {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  name: string;
  
  constructor(obj?: LightCompanyDTO) {
    Object.assign(this, obj);
  }
}
