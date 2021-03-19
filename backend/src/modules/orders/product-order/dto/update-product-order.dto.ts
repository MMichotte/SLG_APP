import { CreateProductOrderDTO } from './create-product-order.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { EProductOrderStatus } from '../enums/product-order-status.enum';

export class UpdateProductOrderDTO extends CreateProductOrderDTO{
  
  @ApiPropertyOptional()
  @IsNumber()
  @IsPositive()
  @IsOptional()
  quantityReceived?: number;
  
  @ApiPropertyOptional()
  @IsNumber()
  @IsPositive()
  @IsOptional()
  purchasePriceHTAtDate?: number;

  @ApiProperty({enum: EProductOrderStatus})
  @IsEnum(EProductOrderStatus)
  @IsNotEmpty()
  status: EProductOrderStatus;
  
  constructor(obj?: UpdateProductOrderDTO) {
    super();
    Object.assign(this, obj);
  }
}
