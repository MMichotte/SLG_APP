import { EStockUpdateType } from './../enums/stock-update-type.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class StockUpdateDTO {

  @Expose()
  @ApiProperty()
  id: number;
  
  @Expose()
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

}
