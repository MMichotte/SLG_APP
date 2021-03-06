import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsEnum } from 'class-validator';
import { Product } from '@modules/products/entities/product.entity';
import { EStockUpdateType } from '../enums/stock-update-type.enum';

export class CreateStockUpdateDTO {

  @ApiProperty({ enum: EStockUpdateType })
  @IsEnum(EStockUpdateType)
  @IsNotEmpty()
  type: EStockUpdateType;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  note?: string;

  product: Product;

  constructor(obj?: CreateStockUpdateDTO) {
    Object.assign(this, obj);
  }
}
