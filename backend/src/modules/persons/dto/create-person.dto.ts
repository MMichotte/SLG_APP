import { CreateAddressDTO } from '@modules/adresses/dto/create-address.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ECivility } from '../enums/ECivility.enum';

export class CreatePersonDTO {
  
  @ApiProperty({ enum: ECivility })
  @IsEnum(ECivility)
  @IsNotEmpty()
  civility: ECivility;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  mobile?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  VAT?: string;
  
  @ApiPropertyOptional()
  @IsOptional()
  address?: CreateAddressDTO;

  createdAt?: Date = new Date();
  updatedAt?: Date = new Date();

  constructor(obj?: CreatePersonDTO) {
    Object.assign(this, obj);
  }

}
