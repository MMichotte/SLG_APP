import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateWorkforceDTO {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  label: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  priceHT: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  priceTTC: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  note?: string;

  createdAt?: Date = new Date();
  updatedAt?: Date = new Date();

  constructor(obj?: CreateWorkforceDTO) {
    Object.assign(this, obj);
  }
}
