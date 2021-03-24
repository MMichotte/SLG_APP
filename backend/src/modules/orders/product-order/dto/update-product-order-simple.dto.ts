import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { EProductOrderStatus } from '../enums/product-order-status.enum';
import { Order } from '../../orders/entities/order.entity';

export class UpdateProductOrderSimpleDTO {
  
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  orderId?: number;
  order?: Order;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  note?: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  quantityOrdered: number;

  @ApiProperty({enum: EProductOrderStatus})
  @IsEnum(EProductOrderStatus)
  @IsNotEmpty()
  status: EProductOrderStatus;
  
  constructor(obj?: UpdateProductOrderSimpleDTO) {
    Object.assign(this, obj);
  }
}
