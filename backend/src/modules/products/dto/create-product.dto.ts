import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  quantityReserved: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  note: string;

  createdAt?: Date = new Date();
  updatedAt?: Date = new Date();
}
