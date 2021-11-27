import { Product } from '@modules/products/entities/product.entity';
import { Worksheet } from '@modules/worksheets/worksheets/entities/worksheet.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductWorksheetDTO {

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  productId: number;
  product?: Product;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  worksheetId: number;
  worksheet?: Worksheet;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
  
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  salePriceAtDate: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  note?: string;

  createdAt?: Date = new Date();
  updatedAt?: Date = new Date();

  constructor(obj?: CreateProductWorksheetDTO) {
    Object.assign(this, obj);
  }
}
