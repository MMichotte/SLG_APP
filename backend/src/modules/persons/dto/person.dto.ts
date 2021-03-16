import { AddressDTO } from '../../adresses/dto/address.dto';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ECivility } from '../enums/ECivility.enum';
import { IsOptional } from 'class-validator';

@Exclude()
export class PersonDTO {
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
  @IsOptional()
  phone: string;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  mobile: string;

  @Expose()
  @ApiPropertyOptional({type: AddressDTO})
  @IsOptional()
  address: AddressDTO;
  
}
