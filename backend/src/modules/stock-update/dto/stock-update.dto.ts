import { EStockUpdateType } from './../enums/stock-update-type.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class StockUpdateDTO {

  @Expose()
  @ApiProperty()
  id: number;
  
  @Expose()
  @Transform(({ obj }) => obj.product.id)
  @ApiProperty()
  productId: number;

  @Expose()
  @ApiProperty()
  type: EStockUpdateType;
  
  @Expose()
  @ApiProperty()
  quantity: number;
  
  @Expose()
  @ApiPropertyOptional()
  note?: string;
  
  @Expose()
  @ApiProperty()
  updatedAt: Date;
}
