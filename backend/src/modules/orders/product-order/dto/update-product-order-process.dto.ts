import { BillSupplier } from '../../../bills/bill-supplier/entities/bill-supplier.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { Order } from '../../orders/entities/order.entity';

export class UpdateProductOrderProcessDTO {
  
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  orderId: number;
  order?: Order;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  note?: string;
  
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  quantityReceived: number;
  
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  pcInvoicePrice: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  pcPurchasePriceHTAtDate: number;

  
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  billSupplierId?: number
  BillSupplier?: BillSupplier;

  constructor(obj?: UpdateProductOrderProcessDTO) {
    Object.assign(this, obj);
  }
}
