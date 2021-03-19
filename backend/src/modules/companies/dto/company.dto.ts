import { ECompanyType } from './../enums/company-type.enum';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { PersonDTO } from '../../persons/dto/person.dto';
import { AddressDTO } from './../../adresses/dto/address.dto';

@Exclude()
export class CompanyDTO {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  type: ECompanyType

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  email: string;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  VAT: string;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  phone1: string;
  
  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  phone2: string;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  mobile: string;
  
  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  website: string;

  @Expose()
  @ApiPropertyOptional({type: PersonDTO})
  @IsOptional()
  person: PersonDTO;

  @Expose()
  @ApiPropertyOptional({type: AddressDTO})
  @IsOptional()
  address: AddressDTO;
  
  constructor(obj?: CompanyDTO) {
    Object.assign(this, obj);
  }
}
