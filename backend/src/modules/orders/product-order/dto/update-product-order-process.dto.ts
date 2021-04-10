import { BillSupplier } from '@modules/bills/bill-supplier/entities/bill-supplier.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class UpdateProductOrderProcessDTO {
  
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;
  
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  prodId?: number;

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

  billSupplier?: BillSupplier;

  constructor(obj?: UpdateProductOrderProcessDTO) {
    Object.assign(this, obj);
  }
}
