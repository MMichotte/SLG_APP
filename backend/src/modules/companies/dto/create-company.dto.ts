import { ECompanyType } from './../enums/company-type.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsNumber, IsEnum } from 'class-validator';
import { CreateAddressDTO } from '@modules/adresses/dto/create-address.dto';
import { Person } from '@modules/persons/entities/person.entity';

export class CreateCompanyDTO {
  
  @ApiProperty({ enum: ECompanyType })
  @IsEnum(ECompanyType)
  @IsNotEmpty()
  type: ECompanyType;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  VAT?: string;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  phone1?: string;
  
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  phone2?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  mobile?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  website?: string;
  
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  personId?: number;
  person?: Person;

  @ApiPropertyOptional()
  @IsOptional()
  address?: CreateAddressDTO;

  createdAt?: Date = new Date();
  updatedAt?: Date = new Date();

  constructor(obj?: CreateCompanyDTO) {
    Object.assign(this, obj);
  }
}
