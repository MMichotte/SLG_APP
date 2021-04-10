import { ProductDTO } from '@modules/products/dto/product';
import { Exclude, Expose, Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EProductOrderStatus } from '../enums/product-order-status.enum';

@Exclude()
export class ProductOrderDTO {
  @Expose()
  @ApiProperty()
  id: number;
  
  @Expose()
  @ApiProperty({type: ProductDTO})
  product: ProductDTO;
  
  @Expose()
  @Transform(({ obj }) => obj.order?.id)
  @ApiPropertyOptional()
  orderId?: number;

  @Expose()
  @Transform(({ obj }) => obj.billSupplier?.id)
  @ApiPropertyOptional()
  billSupplierId?: number

  @Expose()
  @ApiPropertyOptional()
  note?: string;

  @Expose()
  @ApiProperty()
  quantityOrdered: number;
  
  @Expose()
  @ApiPropertyOptional()
  quantityReceived: number;
  
  @Expose()
  @ApiPropertyOptional()
  pcInvoicePrice?: number;
  
  @Expose()
  @ApiPropertyOptional()
  pcPurchasePriceHTAtDate?: number;
  
  @Expose()
  @ApiProperty({enum: EProductOrderStatus})
  status: EProductOrderStatus;
  
  @Expose()
  @ApiProperty()
  createdAt: Date;
  
  @Expose()
  @ApiProperty()
  updatedAt: Date;
  
  constructor(obj?: ProductOrderDTO) {
    Object.assign(this, obj);
  }
}
