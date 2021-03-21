import { BillSupplier } from './../../../bills/bill-supplier/entities/bill-supplier.entity';
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
  pcInvoicePrice?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsPositive()
  @IsOptional()
  pcPurchasePriceHTAtDate?: number;

  @ApiProperty({enum: EProductOrderStatus})
  @IsEnum(EProductOrderStatus)
  @IsNotEmpty()
  status: EProductOrderStatus;
  
  
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  billSupplierId?: number
  BillSupplier?: BillSupplier;

  constructor(obj?: UpdateProductOrderDTO) {
    super();
    Object.assign(this, obj);
  }
}
