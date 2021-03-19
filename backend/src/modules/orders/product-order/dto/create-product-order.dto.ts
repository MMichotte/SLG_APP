import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Order } from '../../orders/entities/order.entity';
import { Product } from '../../../products/entities/product.entity';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { EProductOrderStatus } from '../enums/product-order-status.enum';

export class CreateProductOrderDTO {
  
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  productId: number;
  product?: Product;
  
  order?: Order;
  
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  note?: string;
  
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  quantityOrdered: number;

  status?: EProductOrderStatus = EProductOrderStatus.ORDERED;
  
  constructor(obj?: CreateProductOrderDTO) {
    Object.assign(this, obj);
  }
}
