import { Exclude, Expose } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Exclude()
export class BillSupplierDTO {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiPropertyOptional()
  invoiceNumber: string;

  @Expose()
  @ApiPropertyOptional()
  shippingFees: number;

  @Expose()
  @ApiProperty()
  debitedAmount: number;

  @Expose()
  @ApiPropertyOptional()
  note: string; 

  @Expose()
  @ApiProperty()
  createdAt: Date;
  
  @Expose()
  @ApiProperty()
  updatedAt: Date;

  @Expose()
  @ApiProperty()
  orderId: number;

  @Expose()
  @ApiProperty()
  companyName: string;

  constructor(obj?: BillSupplierDTO) {
    Object.assign(this, obj);
  }
}
