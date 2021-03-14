import { ClientDTO } from './../../clients/dto/client.dto';
import { AddressDTO } from './../../adresses/dto/address.dto';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Address } from 'node:cluster';
import { Client } from 'src/modules/clients/entities/client.entity';
import { IsOptional } from 'class-validator';

@Exclude()
export class CompanyDTO {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  isSupplier: boolean;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  email: string;

  @Expose()
  @ApiProperty()
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
  @ApiPropertyOptional({type: ClientDTO})
  @IsOptional()
  client: ClientDTO;

  @Expose()
  @ApiPropertyOptional({type: AddressDTO})
  @IsOptional()
  address: AddressDTO;
  
}
