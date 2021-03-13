import { Exclude, Expose } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Address } from 'node:cluster';
import { Client } from 'src/modules/clients/entities/client.entity';

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
  phone1: string;
  
  @Expose()
  @ApiPropertyOptional()
  phone2: string;

  @Expose()
  @ApiPropertyOptional()
  mobile: string;
  
  @Expose()
  @ApiPropertyOptional()
  website: string;

  @Expose()
  @ApiPropertyOptional()
  client: Client;

  @Expose()
  @ApiPropertyOptional()
  address: Address;
  
}
