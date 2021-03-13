import { Client } from './../../clients/entities/client.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsNumber, IsBoolean } from 'class-validator';
import { CreateAddressDTO } from 'src/modules/adresses/dto/create-address.dto';

export class CreateCompanyDTO {
  
  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  isSupplier: boolean;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  VAT: string;
  
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
  clientId?: number;
  client?: Client;

  @ApiPropertyOptional()
  @IsOptional()
  address?: CreateAddressDTO;

  createdAt?: Date = new Date();
  updatedAt?: Date = new Date();

}
