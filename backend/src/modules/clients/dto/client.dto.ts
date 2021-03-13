import { Exclude, Expose } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ECivility } from '../enums/ECivility.enum';
import { Address } from 'node:cluster';

@Exclude()
export class ClientDTO {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  civility: ECivility;

  @Expose()
  @ApiProperty()
  firstName: string;

  @Expose()
  @ApiProperty()
  lastName: string;

  @Expose()
  @ApiProperty()
  email: string;

  @Expose()
  @ApiPropertyOptional()
  phone: string;

  @Expose()
  @ApiPropertyOptional()
  mobile: string;

  @Expose()
  @ApiPropertyOptional()
  address: Address;
  
}
