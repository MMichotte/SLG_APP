import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDTO {
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  reference: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  label: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  purchasePriceHT: number;
  
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  salePriceHT: number;
  
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  salePriceTTC: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  note?: string;

  quantity = 0;
  
  createdAt?: Date = new Date();
  updatedAt?: Date = new Date();

}
